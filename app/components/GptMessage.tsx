import { RiRobot2Line } from "react-icons/ri";
import Markdown from "react-markdown";

interface Props {
  text: string
}

export const GptMessage = ({ text }: Props) => {
  return (
    <div className="col col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 flex-shrink-0 text-white text-x">
          <RiRobot2Line size={20} />
        </div>
        <div className="relative ml-3 text-sm bg-gray-100 py-2 px-4 shadow rounded-xl text-gray-600 text-x">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}
