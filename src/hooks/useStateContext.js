import React, { createContext, useState, useContext, useEffect } from "react";

export const stateContext = createContext();

export const getFreshContext = () => {
  const defaultContext = {
    userId: 0,
    userType: "",
  };
  const storedContext = JSON.parse(window.sessionStorage.getItem("context"));
  return storedContext !== null ? storedContext : defaultContext;
};

export function useStateContext() {
  const { context, setContext } = useContext(stateContext);
  return { context, setContext };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());
  useEffect(() => {
    window.sessionStorage.setItem("context", JSON.stringify(context));
  }, [context]);

  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  );
}
