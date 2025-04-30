"use client"

import { useState } from "react";
import useAppContext from "./appContext";
import { studyPlanAgent, youtubeContentAgent, testAgent } from "./agents";
import { MarkdownResponse } from "./data/markdownResponse";
import type { MDXComponents } from "mdx/types";
import Markdown from "react-markdown";
import { IListVideos, ITest } from "./interfaces";
import { StudyPlan, YoutubeVideos, Test } from "./components";

import "./styles/studyplan.css";

export default function HomeOLD() {
  const [subject, setSubject] = useState("Os continentes do mundo");
  const [grade, setGrade] = useState("5º ano do ensino fundamental");
  const [isLoading, setIsLoading] = useState(false);

  const { activateAgents, setActivateAgents } = useAppContext();

  const handleClick = async () => {
    setActivateAgents(true);
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1 className="text-4xl font-bold">Home Teacher</h1> */}
      <button
        type="button"
        className="bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 ease-in-out"
        onClick={() => handleClick()}
      >
        Start
      </button>
      {JSON.stringify(activateAgents)}

      <div className="w-full p-16 bg-gray-500 break-words">
        {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

        <div className="text-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Study Plan</h2>
          <StudyPlan subject={subject} grade={grade} />
        </div>

        <hr />
        <div className="text-lg text-white">
          <h2 className="text-2xl font-bold mb-4">YouTube Content</h2>
          <YoutubeVideos subject={subject} grade={grade} />
        </div>

        <hr />

        <div className="text-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Simulado</h2>
          <Test subject={subject} grade={grade} />
        </div>
      </div>

      <p className="text-lg text-gray-600">
        A homework helper for students
      </p>

    </main>
  );
}
