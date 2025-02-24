import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  const [darkmode, setDarkmode] = useState(() => {
    return localStorage.getItem('darkmode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkmode', darkmode ? 'true' : 'false');
  }, [darkmode]);

  return (
    <ThemeContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext);
};