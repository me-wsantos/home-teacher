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
import { promptYoutubeContentAgent } from "../prompts/youtubeContentAgent";

// Set the connection string from the environment variable
const connectionString = process.env.NEXT_PUBLIC_PROJECT_CONNECTION_STRING || "";
const model = "gpt-4o";

// Throw an error if the connection string is not set
if (!connectionString) {
  throw new Error("Please set the PROJECT_CONNECTION_STRING environment variable.");
}

export async function youtubeContentAgentOLD(subject: string, level: string) {
  const client = AIProjectsClient.fromConnectionString(connectionString, new DefaultAzureCredential());
  // Step 1 code interpreter tool
  const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([]);
  const prompt = promptYoutubeContentAgent(subject, level);

    const agent = await client.agents.createAgent(model, {
      name: "content",
      instructions: prompt.intructions,
      tools: [codeInterpreterTool.definition],
      toolResources: codeInterpreterTool.resources,
    });

    // Step 3 a thread
    const thread = await client.agents.createThread();

    // Step 4 a message to thread
    await client.agents.createMessage(
      thread.id, {
      role: "user",
      content: prompt.prompt,
    });

    // Intermission is now correlated with thread
    // Intermission messages will retrieve the message just added

    // Step 5 the agent
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

    // 6. Print the messages from the agent
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

    // 7. Delete the agent once done
    await client.agents.deleteAgent(agent.id);

    return JSON.stringify(response);
}