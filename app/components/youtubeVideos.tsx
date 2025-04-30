"use client"

import { useEffect, useState } from "react";
import useAppContext from "../appContext";
import { youtubeContentAgent } from "../agents";
import { IListVideos } from "../interfaces";
import { CardVideo } from "./CardVideo";
import { TypingLoader } from "./loaders/TypingLoader";
import { CiYoutube } from "react-icons/ci";

interface IProps {
  subject: string;
  grade: string;
}

export function YoutubeVideos({ subject, grade }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeList, setYoutubeList] = useState<IListVideos[]>([]);
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
    <div className="hidden h-full lg:flex flex-col justify-center items-end max-w-7xl mx-auto bg-white">
      <nav className="flex-col ml-0 w-[400px] min-h-full bg-custom-blue px-0 pt-4">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex items-center mt-4">
            <CiYoutube size={32} className="text-blue-600 mr-3" />
            <h4 className="font-bold text-lg text-blue-600 mt-0 mb-0  text-center lg:text-xl">
              Vídeos do YouTube
            </h4>
          </div>
          <div className="text-base p-4 overflow-scroll overflow-x-hidden overflow-y-visible h-[calc(100vh-100px)] mt-0 mb-8 flex flex-col items-center">
            {isLoading && <TypingLoader className="bg-white p-2" description="Aguarde..." />}

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
    </div>
  );
}
