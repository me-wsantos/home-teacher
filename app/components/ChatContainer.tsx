"use client"
import { useEffect, useRef, useState } from "react";
import useAppContext from "../appContext";
import { GptMessage, MyMessage, TextMessageBox } from "./"
import { IMessage } from "../interfaces";
import { TypingLoader } from "./loaders/TypingLoader";
import { chatAgent } from "../agents/chatAgent";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

interface IProps {
  subject: string;
  grade: string;
}

export const ChatContainer = ({ subject, grade }: IProps) => {
  const [loadingChat, setLoadingChat] = useState(false);
  const { chatMessages, setChatMessages, userQuestion } = useAppContext();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current as HTMLDivElement;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatMessages]);

  const handlePost = async (text: string) => {
    setLoadingChat(true);

    // Adiciona a mensagem do usuário
    const newUserMessage = { role: "user", content: text };
    const updatedMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedMessages);

    const context = subject + ". " + userQuestion;

    try {
      const result = await chatAgent(context, grade);

      const newAssistantMessage = {
        role: "assistant",
        content: result[1]
      };
      setChatMessages((prev: any) => [...prev, newAssistantMessage]);

    } catch (error) {
      console.error("Error in chat service:", error);
      const errorMessage = {
        role: "assistant",
        content: "An error occurred. Please try again later."
      };
      setChatMessages((prev: any) => [...prev, errorMessage]);
    } finally {
      setLoadingChat(false);
    }
  }

  return (
    <div className="flex flex-col flex-shrink-0 rounded-2xl bg-white h-[calc(100vh-350px)] p-4 border">
      <div className="flex items-center mt-4">
        <IoChatboxEllipsesOutline size={32} className="text-blue-600 mr-3" />
        <h4 className="font-bold text-lg text-blue-600 mt-0 mb-0  text-center lg:text-xl">
          Chat
        </h4>
      </div>

      <div
        className={`mt-24 lg:mt-6 chat-messages`}
        ref={scrollContainerRef}
      >
        <div className="flex flex-col">

          {chatMessages.map((message: IMessage, index: number) => (
            message.role === "assistant"
              ? <GptMessage key={index} text={message.content} />
              : <MyMessage key={index} text={message.content} />
          ))}

          {loadingChat && (
            <TypingLoader className="fade-in" />
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Type your message..."
        disableCorrections
      />
    </div>
  )
}