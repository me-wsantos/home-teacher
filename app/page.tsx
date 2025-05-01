"use client"

import { useState } from "react";
import useAppContext from "./appContext";
import { StudyPlan, YoutubeVideos, ChatContainer } from "./components";
import { FaGithub } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

import "./styles/studyplan.css";
import Link from "next/link";

export default function Home() {
  const [grade, setGrade] = useState("5º ano do ensino fundamental");
  const { subject, setSubject, setActivateAgents, setChatMessages } = useAppContext();

  const handleClick = async () => {
    setActivateAgents(true);
    const newUserMessage = {
      role: "user",
      content: `OK. I will help you create a study plan about ${subject.trim()}`
    };

    setChatMessages((prevMessages: any) => [...prevMessages, newUserMessage]);
  }

  return (
    <main className="h-screen w-full flex flex-row mt-0 bg-gray-100 overflow-hidden">
      <StudyPlan subject={subject} grade={grade} />
      <section className="mx-3 sm:mx-20 flex flex-col w-full p-5 mt-0 rounded-3xl">
        {/* <NavbarMobile /> */}
        <div className="w-full h-12 px-4 pt-0 flex justify-between items-center max-w-[110rem] mb-4 mx-auto bg-gray-200 xl:px-0 xl:justify-between">
          <div className="mx-4 flex items-center gap-2">
            <Link href="https://hackbox.microsoft.com/hackathons/Innovation-Challenge-March-2025/project/91588" target="_blank" title="Open Hackbox project">
              <div className="flex items-center gap-2">
                <PiStudent size={24} color="#000000" />
                <span className="text-lg text-black font-bold">Home Teacher - <small className="font-thin text-gray-600">Your Smart Personal Tutor</small> </span>
              </div>
            </Link>
          </div>

          <div className="mx-4 flex items-center gap-2">
            <Link href="https://github.com/me-wsantos/home-teacher.git" target="_blank" title="Open Github repository">
              <div className="flex items-center gap-2">
                <FaGithub size={20} color="#000000" />
                <span className="text-sm text-black">Github</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col flex-shrink-0 rounded-2xl bg-white h-[200px] p-4 border">
          <div
            className={`flex flex-col flex-auto h-full p-1 overflow-hidden`}
          >
            <label
              htmlFor="subject"
              className="text-sm text-blue-700 font-bold mb-2"
            >To create your study plan, write a complete request informing the topic, school year, and target audience.
            </label>
            <textarea
              id="subject"
              name="subject"
              rows={20}
              cols={50}
              autoFocus
              className="flex w-full border rounded-xl text-base text-gray-800 focus:outline-none focus:border-x-indigo-300 p-2"
              placeholder="Please create a study plan about square roots for 5th-grade elementary school students."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className={`flex justify-between items-center py-2 px-3 rounded-xl bg-blue-600 lg:px-8`}
              onClick={() => handleClick()}
            >
                <span className="text-white mr-2 text-sm">Generate study plan</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row h-full mt-6">
          <div
            className={`flex flex-col flex-auto h-full p-1 overflow-hidden`}
          >
            <ChatContainer subject={subject} grade={grade} />
          </div>
        </div>
      </section>
      <YoutubeVideos subject={subject} grade={grade} />
    </main>
  );
}
