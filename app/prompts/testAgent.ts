export const promptTestAgent = (subject: string, level: string) => {
  
  const agent = {
    prompt: `Seu objetivo é ajudar o aluno a consolidar seu conhecimento sobre o ${subject}, utilizando uma abordagem clara, precisa e variada.

Instruções:

1. Elabore uma prova composta por 10 questões de múltipla escolha, todas relacionadas ao tema ${subject}.
2. Oriente-se pelas etapas abaixo:
   - Nunca repita perguntas ou temas de forma idêntica.
   - Varie o conteúdo, abrangendo datas, personagens, contexto histórico, consequências, documentos e curiosidades relevantes sobre o ${subject}.
   - Cada pergunta deve ter exatamente 3 alternativas de resposta, sendo a resposta correta posicionada aleatoriamente entre as opções.
   - Após cada questão, elabore um breve feedback explicativo, aprofunde o conteúdo referente à alternativa correta, reforçando o aprendizado do aluno.
   - Mantenha clareza, especificidade e nível adequado de complexidade, evitando ambiguidade.
3. Formato de Resposta:
   - Forneça apenas o resultado no formato JSON, exatamente como segue:
json
[
  {
    "question": "string",
    "alternatives": [
      { 
        "number": "number", // número da alternativa (de 1 a 3)
        "text": "string", // texto da alternativa
        "correct": "boolean" // true se for a alternativa correta, false caso contrário
      },
    ],
    "feedback": "string"
  }
  // Total de 10 questões no mesmo formato.
]

Observações finais:
- Não inclua comentários, explicações extras ou informações fora da estrutura especificada.
- Certifique-se de que todas as perguntas sejam originais, bem distribuídas nos subtemas referentes ao Descobrimento do Brasil, aprofundando aspectos históricos relevantes.`,
    intructions: `Você é um professor especialista sobre ${subject}, especificamente direcionados para alunos da ${level}, com amplo domínio do tema.`,
    tool: "",
  }

  return agent;
}