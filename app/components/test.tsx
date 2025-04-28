"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { testAgent } from "../agents";
import { ITest } from "../interfaces";

interface IProps {
  subject: string;
  grade: string;
}

export function Test({ subject, grade }: IProps) {
  const [questionsTest, setQuestionsTest] = useState<ITest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { activateAgents, setActivateAgents } = useAppContext();

  const getQuestionsTest = async () => {
    const result = await testAgent(subject, grade);
    const questions = JSON.parse(result);
    setQuestionsTest(questions);
    setIsLoading(false);
    setActivateAgents(false);
  }

  useEffect(() => {
    if (!activateAgents) return;
    setQuestionsTest([]);
    setIsLoading(true);
    getQuestionsTest();
  }, [activateAgents])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

      <div className="text-lg text-white break-words bg-gray-700">
        {questionsTest && questionsTest.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Simulado</h2>
            <ul>
              {questionsTest.map((question, index) => (
                <li key={index} className="mb-2">
                  {question.question}
                  <ul>
                    {question.alternatives.map((alternative, altIndex) => (
                      <li key={altIndex} className="mb-2">
                        <input type="radio" name={`question-${index}`} value={alternative.number} />
                        {alternative.text}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-400">Feedback: {question.feedback}</p>

                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
