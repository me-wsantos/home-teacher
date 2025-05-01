"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { studyPlanAgent } from "../agents";
import Markdown from "react-markdown";
import { TypingLoader } from "./loaders/TypingLoader";
import { GoProjectRoadmap } from "react-icons/go";

import "../styles/studyplan.css";

interface IProps {
  subject: string;
  grade: string;
}

export function StudyPlan({ subject, grade }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const { activateAgents, setActivateAgents } = useAppContext();

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
          <div className="flex items-center mt-4">
            <GoProjectRoadmap size={32} className="text-blue-600 mr-3" />
            <h4 className="font-bold text-lg text-blue-600 mt-0 mb-0 text-center lg:text-xl">
              Study Plan
            </h4>
          </div>
          <div className="text-[14px] p-4 pr-6 text-gray-600 break-words overflow-scroll overflow-x-hidden overflow-y-visible max-w-[400px] h-[calc(100vh-100px)] mt-6 mb-8">
            { isLoading && <TypingLoader className="bg-white p-2" description="Wait..." /> }
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </nav>
    </div>
  );
}
