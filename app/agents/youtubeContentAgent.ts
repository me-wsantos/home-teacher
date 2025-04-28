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
import { IListVideos } from "../interfaces";

// Set the connection string from the environment variable
const connectionString = process.env.NEXT_PUBLIC_PROJECT_CONNECTION_STRING || "";
const model = "gpt-4o";

// Throw an error if the connection string is not set
if (!connectionString) {
  throw new Error("Please set the PROJECT_CONNECTION_STRING environment variable.");
}

export async function youtubeContentAgent(subject: string, level: string) {
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

  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: prompt.prompt
  });
  console.log(`Created message, message ID: ${message.id}`);
    
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
  
  console.log(`Run completed with status: ${run.status}`);
    
  // Retrieve messages
  const messages = await client.agents.listMessages(thread.id);
  const response = [];

  // Display messages
  for (const dataPoint of messages.data.reverse()) {
    //console.log(`${dataPoint.createdAt} - ${dataPoint.role}:`);
    
    for (const contentItem of dataPoint.content) {
      if (contentItem.type === "text") {
        if ('text' in contentItem && contentItem.text) {
          response.push(contentItem.text.value);
          //console.log(contentItem.text.value);
        }
      }
    }
  }


  const jsonString = response[1];

  // Remove a parte "```json" do início e "```" do final
  const jsonLimpo = jsonString
  .replace(/^```json\n/, '')
  .replace(/\n```$/, '');

  // Converte a string JSON em um objeto JavaScript
  const videosArray: IListVideos[] = JSON.parse(jsonLimpo);
  console.log("videos", videosArray);

  // 7. Delete the agent once done
  await client.agents.deleteAgent(agent.id);

  return JSON.stringify(videosArray);
}