export const promptChatAgent = (subject: string, level: string) => {
  
  const agent = {
    prompt: `Your goal is to help the student clarify their doubts about ${subject}, using a clear and precise approach.
    Be concise in your answers, avoiding excessive or irrelevant information.`,
    intructions: `You are an assistant specialized in ${subject}.`,
    tool: "",
  }

  return agent;
}