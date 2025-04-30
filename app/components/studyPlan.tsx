"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { studyPlanAgent } from "../agents";
import Markdown from "react-markdown";
import { TypingLoader } from "./loaders/TypingLoader";

import "../styles/studyplan.css";

interface IProps {
  subject: string;
  grade: string;
}

export function StudyPlan({ subject, grade }: IProps) {
  const [content, setContent] = useState("");
  const { activateAgents, setActivateAgents, isLoading, setIsLoading } = useAppContext();


  const generateStudyPlan = async () => {
    const result = await studyPlanAgent(subject, grade);
    setContent(result[1].text);
    setIsLoading(false);
    setActivateAgents(false);
  }

  useEffect(() => {
    if (!activateAgents) return;
    setContent("");
    setIsLoading(true);
    generateStudyPlan();
  }, [activateAgents])

  return (
    <div className="hidden h-auto lg:flex flex-col justify-between items-end max-w-7xl mx-auto bg-white">
      <nav className="flex-col ml-0 w-[400px] bg-custom-blue px-0 pt-4">
        <div className="w-full flex flex-col justify-center items-center">
          <h4 className="font-bold text-lg text-gray-600 mt-4 mb-0  text-center lg:text-xl">
            Plano de estudo
          </h4>
          <div className="text-base p-4 pr-6 text-gray-600 break-words overflow-scroll overflow-x-hidden overflow-y-visible max-w-[400px] h-[calc(100vh-100px)] mt-6 mb-8">
            { isLoading && <TypingLoader className="bg-blue-700 p-2" description="Aguarde..." /> }
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </nav>
    </div>
  );
}
