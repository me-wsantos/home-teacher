"use client"

import { useState } from "react";
import { studyPlanAgent } from "./agents/studyPlanAgent";
import { MarkdownResponse } from "./data/markdownResponse";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleClick = async () => {
    setContent("");
    setIsLoading(true);
    const subject = "Os planetas do sistema solar";
    //const result = await studyPlanAgent(subject);

    setIsLoading(false);
    //setContent(result[1].text);

    //console.log(result);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1 className="text-4xl font-bold">Home Teacher</h1> */}
      <button
        type="button"
        className="bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 ease-in-out"
        onClick={()=>handleClick()}
      >
        Start
      </button>

      <div>
        {isLoading && <p className="text-lg text-gray-600">Loading...</p>}

        {MarkdownResponse.length > 0 && (
          <>
            <div className="text-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Study Plan</h2>

              <div className="prose prose-invert"></div>
                <article dangerouslySetInnerHTML={{ __html: MarkdownResponse }} />
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
            <hr />

            <div className="text-lg text-white">
              { JSON.stringify(MarkdownResponse) }
            </div>
          </>
        )}
      </div>

      <p className="text-lg text-gray-600">
        A homework helper for students
      </p>
      
    </main>
  );
}
