export interface IListVideos {
  title: string;
  channel: string;
  visualizations: number;
  publish: string; // formato YYYY-MM-DD
  link: string;
}

export interface ITest {
  question: string,
  alternatives: [{ number: number, text: string, correct: boolean }],  
  feedback: string
}

export interface IMessage {
  role: "assistant" | "user";
  content: string;
}

export interface IAppContext {
  subject: string
  setSubject(value: string): void
  userQuestion: string
  setUserQuestion(value: string): void
  activateAgents: boolean
  setActivateAgents(value: boolean): void
  messages: IMessage[],
  setMessages(value: any): void
  isLoading: boolean
  setIsLoading(value: boolean): void
  chatMessages: any,
  setChatMessages(value: any): void
}