"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { youtubeContentAgent } from "../agents";
import { IListVideos } from "../interfaces";
import { CardVideo } from "./CardVideo";
import { TypingLoader } from "./loaders/TypingLoader";

interface IProps {
  subject: string;
  grade: string;
}

export function YoutubeVideos({ subject, grade }: IProps) {
  const [youtubeList, setYoutubeList] = useState<IListVideos[]>([]);
  const { activateAgents, setActivateAgents, isLoading, setIsLoading } = useAppContext();

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
    <div className="hidden h-full lg:flex flex-col justify-center items-end max-w-7xl mx-auto bg-white">
      <nav className="flex-col ml-0 w-[400px] min-h-full bg-custom-blue px-0 pt-4">
        <div className="w-full flex flex-col justify-center items-center">
          {/* <Image src={"/images/logo.png"} width={50} height={50} alt="App logo" /> */}
          <h4 className="font-bold text-lg text-gray-600 mt-4 mb-4  text-center lg:text-xl">
            Vídeos do YouTube
          </h4>
          <div className="text-base p-4 overflow-scroll overflow-x-hidden overflow-y-visible h-[calc(100vh-100px)] mt-0 mb-8 flex flex-col items-center">
            { isLoading && <TypingLoader className="bg-blue-700 p-2" description="Aguarde..." /> }

            {youtubeList && youtubeList.length > 0 && (
              youtubeList.map((video, index) => (
                <CardVideo
                  key={index}
                  title={video.title}
                  channel={video.channel}
                  url={video.link}
                  visualizations={video.visualizations}
                  publish={video.publish}
                />
              ))
            )}
          </div>
        </div>
      </nav>
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
      </main> */}
    </div>
  );
}
