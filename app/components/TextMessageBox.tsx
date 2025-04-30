"use client"
import { FormEvent, useState } from "react";
import useAppContext from "../appContext";
import { IoIosSend } from "react-icons/io";

interface Props {
  onSendMessage: (message: string) => void
  placeholder?: string
  disableCorrections?: boolean
}

export const TextMessageBox = ({ onSendMessage, placeholder, disableCorrections = false}: Props) => {
  //const [message, setMessage] = useState("");
  const { setChatMessages, userQuestion, setUserQuestion } = useAppContext();

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Adiciona a mensagem do usuário ao array chatMessages
    const newUserMessage = {
      role: "user",
      content: userQuestion.trim()
    };

    setChatMessages((prevMessages: any) => [...prevMessages, newUserMessage]);

    // Chama a função onSendMessage passada como prop
    onSendMessage(userQuestion.trim())

    // Limpa o campo de mensagem
    setUserQuestion("")
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-12 rounded-xl bg-gray-200 w-full px-0"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            name="message"
            autoFocus
            className="flex w-full border rounded-xl text-sm text-gray-800 focus:outline-none focus:border-x-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button
          type="submit"
          className={`flex justify-between items-center py-2 px-3 rounded-xl bg-blue-600 lg:px-8`}
        >
          <span className="text-white mr-2 text-sm">Enviar</span>
          <IoIosSend color="white" size={20} />
        </button>
      </div>
    </form>
  )
}
