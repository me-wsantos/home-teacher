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
