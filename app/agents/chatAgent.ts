"use server";

import {
  AIProjectsClient,
  ToolUtility,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import { promptChatAgent } from "../prompts/chatAgent";

// Set the connection string from the environment variable
const connectionString = process.env.NEXT_PUBLIC_PROJECT_CONNECTION_STRING || "";
const model = "gpt-4o";

// Throw an error if the connection string is not set
if (!connectionString) {
  throw new Error("Please set the PROJECT_CONNECTION_STRING environment variable.");
}

export async function chatAgent(subject: string, level: string) {
  const client = AIProjectsClient.fromConnectionString(connectionString, new DefaultAzureCredential());
  
  // code interpreter tool
  const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([]);
  const prompt = promptChatAgent(subject, level);

  const agent = await client.agents.createAgent(model, {
    name: "chat",
    instructions: prompt.intructions,
    tools: [codeInterpreterTool.definition],
    toolResources: codeInterpreterTool.resources,
  });

  // thread
  const thread = await client.agents.createThread();

  // message to thread
  await client.agents.createMessage(thread.id, {
    role: "user",
    content: prompt.prompt
  });

  // Create run
  let run = await client.agents.createRun(thread.id, agent.id);
  
  // Poll until the run reaches a terminal status
  while (
    run.status === "queued" ||
    run.status === "in_progress"
  ) {
    // Wait for a second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
  }
  
  // Retrieve messages
  const messages = await client.agents.listMessages(thread.id);
  const response = [];

  // Display messages
  
  for (const dataPoint of messages.data.reverse()) {
    console.log(`${dataPoint.createdAt} - ${dataPoint.role}:`);
    for (const contentItem of dataPoint.content) {
      if (contentItem.type === "text") {
        if ('text' in contentItem && contentItem.text) {
          response.push(contentItem.text.value);
          console.log(contentItem.text.value);
        }
      }
    }
  }

  // Delete the agent once done
  await client.agents.deleteAgent(agent.id);

  return response;
}