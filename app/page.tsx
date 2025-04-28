"use client"

import { useState } from "react";
import { studyPlanAgent, youtubeContentAgent } from "./agents";
import { MarkdownResponse } from "./data/markdownResponse";
import type { MDXComponents } from "mdx/types";
import Markdown from "react-markdown";
import { IListVideos } from "./interfaces";

import "./styles/studyplan.css";

export default function Home() {
  const [subject, setSubject] = useState("O cerrado brasileiro");
  const [grade, setGrade] = useState("5 ano do ensino fundamental");
  const [content, setContent] = useState("");
  const [youtubeList, setYoutubeList] = useState<IListVideos[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setContent("");
    setIsLoading(true);

    //await Promise.all([generateStudyPlan(), getYouTubeContent()]);
    await Promise.all([getYouTubeContent()]);
    setIsLoading(false);
  }

  const generateStudyPlan = async () => {
    const result = await studyPlanAgent(subject, grade);
    setContent(result[1].text);
  }

  const getYouTubeContent = async () => {
    const result = await youtubeContentAgent(subject, grade);
    const videos = JSON.parse(result);
    setYoutubeList(videos);
    console.log("videos", result);
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

      <div className="w-full p-16 bg-gray-500 break-words">
        {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

        {/** Study plan *********************************************************************************************/}
        {content.length > 0 && (
          <>
            <div className="text-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Study Plan</h2>
            </div>
            {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
            <hr />

            <div className="text-lg text-white break-words bg-gray-700">
              <Markdown>{content}</Markdown>
            </div>
          </>
        )}

        {/** Youtube list videos *********************************************************************************************/}
        <div className="text-lg text-white break-words bg-gray-700">
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
        </div>

        {/** Exercise *********************************************************************************************/}


      </div>

      <p className="text-lg text-gray-600">
        A homework helper for students
      </p>

    </main>
  );
}
