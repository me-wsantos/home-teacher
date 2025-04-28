"use client"

import { useState } from "react";
import useAppContext from "./appContext";
import { studyPlanAgent, youtubeContentAgent, testAgent } from "./agents";
import { MarkdownResponse } from "./data/markdownResponse";
import type { MDXComponents } from "mdx/types";
import Markdown from "react-markdown";
import { IListVideos, ITest } from "./interfaces";
import { StudyPlan } from "./components";

import "./styles/studyplan.css";

export default function Home() {
  const [subject, setSubject] = useState("Os continentes do mundo");
  const [grade, setGrade] = useState("5º ano do ensino fundamental");
  const [youtubeList, setYoutubeList] = useState<IListVideos[]>([]);
  const [questionsTest, setQuestionsTest] = useState<ITest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { activateAgents, setActivateAgents } = useAppContext();

  const handleClick = async () => {
    //setIsLoading(true);

    //await Promise.all([generateStudyPlan(), getYouTubeContent(), getQuestionsTest()]);
    //await Promise.all([generateStudyPlan()]);
    setActivateAgents(true);
    //setIsLoading(false);
  }

  /* const getYouTubeContent = async () => {
    const result = await youtubeContentAgent(subject, grade);
    const videos = JSON.parse(result);
    setYoutubeList(videos);
    console.log("videos", result);
  } */
  
  /* const getQuestionsTest = async () => {
    const result = await testAgent(subject, grade);
    const questions = JSON.parse(result);
    setQuestionsTest(questions);
    console.log("questions", result);
  } */

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
      { JSON.stringify(activateAgents) }

      <div className="w-full p-16 bg-gray-500 break-words">
        {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

        <StudyPlan subject={subject} grade={grade} />
        

        {/** Youtube list videos *********************************************************************************************/}
        {/* <div className="text-lg text-white break-words bg-gray-700">
          {youtubeList && youtubeList.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-4">YouTube Content</h2>
              <ul>
                {youtubeList.map((video, index) => (
                  <li key={index} className="mb-2">
                    <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {video.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div> */}

        {/** Exercise *********************************************************************************************/}
        {/* <div className="text-lg text-white break-words bg-gray-700">
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
        </div> */}

      </div>

      <p className="text-lg text-gray-600">
        A homework helper for students
      </p>

    </main>
  );
}
