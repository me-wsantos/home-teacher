export const promptStudyPlanAgent = (subject: string, grade: string) => {
  
  const agent = {
    prompt: `I need to create a logical and organized study plan about ${subject}. Consider the following topics: 
    1. Introduction to ${subject}, 
    2. Fundamentals of ${subject}, 
    3. Practical applications of ${subject}.
    4. Advanced topics in ${subject}.
    Consider spending one hour per day studying and 30 minutes reviewing what you have learned.
    Use the Pareto 80/20 method to prioritize the most important and relevant topics.
    Return the result in markdown format as organized as possible, in the following structure:
    1. Introduction:
    2. Fundamentals: create subtopics and explain each of them.
    3. Practical applications: create subtopics and explain each of them.
    4. Advanced topics: create subtopics and explain each of them.

    For each item in the list, create subtopics with a maximum of 5 most relevant themes, explain each of them, and provide an estimated study time.
    `,
    intructions: `You are a pedagogue and a teacher specializing in ${subject}.`,
    tool: "",
  }

  return agent;
}