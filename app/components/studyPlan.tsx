"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { studyPlanAgent } from "../agents";
import Markdown from "react-markdown";

import "../styles/studyplan.css";

interface IProps {
  subject: string;
  grade: string;
}

export function StudyPlan({ subject, grade }: IProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { activateAgents } = useAppContext();

  const generateStudyPlan = async () => {
    const result = await studyPlanAgent(subject, grade);
    setContent(result[1].text);
    setIsLoading(false);
  }

  useEffect(() => {
    setContent("");
    setIsLoading(true);
    if (!activateAgents) return;
    generateStudyPlan();
  },[activateAgents])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

        {/** Study plan *********************************************************************************************/}
        {content.length > 0 && (
          <>
            <div className="text-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Study Plan</h2>
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
            <hr />

            {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

            <div className="text-lg text-white break-words bg-gray-700">
              <Markdown>{content}</Markdown>
            </div>
          </>
        )}
    </main>
  );
}
