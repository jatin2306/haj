import { createContext, useContext } from 'react';

const InitialDataContext = createContext(null);

export function InitialDataProvider({ children, value }) {
  // On client, if value is not provided, fall back to window.__INITIAL_DATA__
  const data = value !== undefined ? value : (typeof window !== 'undefined' ? window.__INITIAL_DATA__ : null);
  
  return (
    <InitialDataContext.Provider value={data}>
      {children}
    </InitialDataContext.Provider>
  );
}

export function useInitialData() {
  return useContext(InitialDataContext);
}
