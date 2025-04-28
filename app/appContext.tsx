'use client'

import { useState, createContext, useContext } from 'react';

interface IAppContext {
  activateAgents: boolean
  setActivateAgents(value: boolean): void
}

const AppContext = createContext({} as IAppContext);

export const AppContextProvider = ({ children }: any) => {
  const [activateAgents, setActivateAgents] = useState(false);

  return (
    <AppContext.Provider value={{ activateAgents, setActivateAgents }}>
      {children}
    </AppContext.Provider>
  );
}
const useAppContext = () => useContext(AppContext);
export default useAppContext;