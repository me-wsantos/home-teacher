"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { youtubeContentAgent } from "../agents";
import { IListVideos } from "../interfaces";

interface IProps {
  subject: string;
  grade: string;
}

export function YoutubeVideos({ subject, grade }: IProps) {
  const [youtubeList, setYoutubeList] = useState<IListVideos[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { activateAgents, setActivateAgents } = useAppContext();

  const getYouTubeContent = async () => {
    const result = await youtubeContentAgent(subject, grade);
    const videos = JSON.parse(result);
    setYoutubeList(videos);
    setIsLoading(false);
    setActivateAgents(false);
  }

  useEffect(() => {
    if (!activateAgents) return;
    setYoutubeList([]);
    setIsLoading(true);
    getYouTubeContent();
  }, [activateAgents])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

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
    </main>
  );
}
