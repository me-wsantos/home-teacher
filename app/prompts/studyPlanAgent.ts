export const promptStudyPlanAgent = (subject: string) => {
  
  const studyPlan = {
    prompt: `Preciso criar um plano de estudos lógico e organizado sobre ${subject}. Considere os seguintes tópicos: 
    1. Introdução a ${subject}, 
    2. Fundamentos de ${subject}, 
    3. Aplicações práticas de ${subject}.
    4. Tópicos avançados em ${subject}.
    Considere gastar uma hora por dia estudando e 30 minutos revisando o que você aprendeu.
    Use o método de Paretto 80/20 para priorizar os tópicos mais importantes e relevantes.
    Retorne o resultado no formato markdown de forma mais organizada possível, na seguinte estrutura:
    1. Introdução:
    2. Fundamentos: crie subtópicos e explique cada um deles.
    3. Aplicações práticas: crie subtópicos e explique cada um deles.
    4. Tópicos avançados : crie subtópicos e explique cada um deles.

    Para cada item da lista, crie subtópicos com no máximo 5 temas mais relevantes, explique cada um deles e tempo estimado de estudo.
    `,
    intructions: `Você é um pedagogo e professor especialista em ${subject}.`,
    tool: "",
  }

  return studyPlan;


  /* const studyPlan = {
    prompt: `Preciso criar um plano de estudos lógico e organizado sobre ${subject}. Considere os seguintes tópicos: 
    1. Introdução a ${subject}, 
    2. Fundamentos de ${subject}, 
    3. Aplicações práticas de ${subject}.
    4. Tópicos avançados em ${subject}.
    Considere gastar uma hora por dia estudando e 30 minutos revisando o que você aprendeu.
    Retorne o resultado no formato JSON de forma mais organizada possível, com os seguintes campos:
    introducao: string,
    fundamentos: string,
    aplicacoes: string,
    topicosAvancados: string,
    tempoEstudo: string,
    tempoRevisao: string
    `,
    intructions: `Você é um pedagogo e professor especialista em ${subject}.`,
    tool: "",
  } */

}