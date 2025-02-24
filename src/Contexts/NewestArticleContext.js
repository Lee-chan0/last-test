import { createContext, useContext, useState } from "react";




const NewestContext = createContext();


export function NewestContextProvider({ children }) {
  const [newestArticle, setNewestArticle] = useState(() => {
    return JSON.parse(localStorage.getItem('articles'));
  });


  return (
    <NewestContext.Provider value={{ newestArticle, setNewestArticle }}>
      {children}
    </NewestContext.Provider>
  )
}


export function useNewestArticles() {
  return useContext(NewestContext);
}