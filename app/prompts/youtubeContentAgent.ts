export const promptYoutubeContentAgent = (subject: string, level: string) => {
  
  const agent = {
    prompt: `Sua tarefa é identificar e listar os melhores vídeos educacionais sobre ${subject}, especificamente direcionados para alunos da ${level}.
    Siga as orientações abaixo:
    1. Critérios de Seleção:
      - O vídeo deve abordar ${subject} de forma didática, acessível e adequada à faixa etária da ${level}.
      - Considere a quantidade de visualizações e de likes como critérios principais de avaliação.
      - Priorize vídeos com linguagem simples, exemplos práticos e recursos visuais que facilitem a compreensão.
      - Certifique-se de que o conteúdo do vídeo seja livre de linguagem inapropriada e alinhado ao currículo básico de matemática para essa série.
      - Avalie a clareza do apresentador e a qualidade da produção como pontos diferenciais.

    2. Formato de Resposta:
      - Retorne o resultado em formato JSON, seguindo exatamente a estrutura abaixo:
      [
        {
          "title": "string",
          "channel": "string",
          "visualizations": number,
          "publish": "string (formato YYYY-MM-DD)"
          "link": "string",
        }
        // até 10 itens
      ]
      

    3. Especificações:
      - Limite sua lista a no máximo 10 vídeos.
      - Ordene os vídeos em ordem decrescente de relevância (considerando visualizações e likes).
      - Certifique-se de que cada item contenha todas as informações requisitadas e que os dados estejam corretos e atualizados.
      - Não inclua vídeos repetidos, que não estejam claramente vinculados ao conteúdo solicitado ou que não tenham a url válida.

    4. Critérios de qualidade:
      - Priorize vídeos brasileiros ou em língua portuguesa, salvo indisponibilidade.
      - Evite vídeos excessivamente longos (sugestão: até 20 minutos).
      - Inclua no mínimo dois vídeos de canais educativos reconhecidos.

    Caso não consiga encontrar vídeos com os critérios acima, retorne uma lista fake no formato JSON que simule o resultado esperado.
    Por favor, forneça apenas a lista no formato JSON conforme especificado, sem adicionar comentários ou explicações extras.`,
    intructions: `Você é um especialista em curadoria de conteúdo no YouTube com foco em educação.`,
    tool: "",
  }

  return agent;
}