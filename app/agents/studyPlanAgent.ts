"use server";

import {
  AIProjectsClient,
  DoneEvent,
  ErrorEvent,
  isOutputOfType,
  MessageStreamEvent,
  RunStreamEvent,
  ToolUtility,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { promptStudyPlanAgent } from "../prompts/studyPlanAgent";

// Set the connection string from the environment variable
const connectionString = process.env.NEXT_PUBLIC_PROJECT_CONNECTION_STRING || "";
const model = "gpt-4o";

// Throw an error if the connection string is not set
if (!connectionString) {
  throw new Error("Please set the PROJECT_CONNECTION_STRING environment variable.");
}

export async function studyPlanAgent(subject: string, grade: string) {
  const client = AIProjectsClient.fromConnectionString(connectionString, new DefaultAzureCredential());
  
  // code interpreter tool
  const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([]);
  const prompt = promptStudyPlanAgent(subject, grade);

    const agent = await client.agents.createAgent(model, {
      name: "studyPlan",
      instructions: prompt.intructions,
      tools: [codeInterpreterTool.definition],
      toolResources: codeInterpreterTool.resources,
    });

    // thread
    const thread = await client.agents.createThread();

    // message to thread
    await client.agents.createMessage(
      thread.id, {
      role: "user",
      content: prompt.prompt,
    });

    // Intermission is now correlated with thread
    // Intermission messages will retrieve the message just added

    // the agent
    const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();

    for await (const eventMessage of streamEventMessages) {
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          break;
        case MessageStreamEvent.ThreadMessageDelta:
          {
            const messageDelta = eventMessage.data;
            if (messageDelta && typeof messageDelta === 'object' && 'content' in messageDelta && Array.isArray((messageDelta as any).content)) {
              messageDelta.content.forEach((contentPart) => {
                if (contentPart.type === "text") {
                  const textContent = contentPart;
                  if (isOutputOfType(textContent, "text")) {
                    if ('text' in textContent) {
                      const textValue = textContent.text.value || "No text";
                    }
                  }
                }
              });
            }
          }
          break;

        case RunStreamEvent.ThreadRunCompleted:
          break;
        case ErrorEvent.Error:
          console.log(`An error occurred. Data ${eventMessage.data}`);
          break;
        case DoneEvent.Done:
          break;
      }
    }

    // Print the messages from the agent
    const messages = await client.agents.listMessages(thread.id);

    // Messages iterate from oldest to newest
    // messages[0] is the most recent
    const messagesArray = messages.data;
    const response = [];

    for (let i = messagesArray.length - 1; i >= 0; i--) {
      const m = messagesArray[i];
      const messageData: any = { type: m.content[0].type };

      if (isOutputOfType(m.content[0], "text")) {
      const textContent = m.content[0];
      if ('text' in textContent && textContent.text) {
        messageData.text = textContent.text.value;
      } else {
        messageData.text = "No text content available.";
      }
      }

      response.push(messageData);
    }
    
    // Delete the agent once done
    await client.agents.deleteAgent(agent.id);

    return response;
}