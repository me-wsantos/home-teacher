export const promptChatAgent = (subject: string, level: string) => {
  
  const agent = {
    prompt: `Seu objetivo é ajudar o aluno a esclarecer suas dúvidas sobre o ${subject}, utilizando uma abordagem clara e precisa.
    Seja consiso nas respostas, evitando informações excessivas ou irrelevantes.`,
    intructions: `Você é um assistente especialista em ${subject}.`,
    tool: "",
  }

  return agent;
}