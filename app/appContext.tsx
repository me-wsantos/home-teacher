'use client'

import { useState, createContext, useContext } from 'react';
import { IAppContext } from './interfaces';

const AppContext = createContext({} as IAppContext);

export const AppContextProvider = ({ children }: any) => {
  const [subject, setSubject] = useState("");
  const [activateAgents, setActivateAgents] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);


  return (
    <AppContext.Provider value={{ 
      subject, setSubject,
      activateAgents, setActivateAgents,
      messages, setMessages,
      isLoading, setIsLoading,
      chatMessages, setChatMessages
    }}>
      {children}
    </AppContext.Provider>
  );
}
const useAppContext = () => useContext(AppContext);
export default useAppContext;