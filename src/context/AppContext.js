//file관리

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(() => {
    return localStorage.getItem("fileName") || "";
  });

  const [selectedCategories, setSelectedCategories] = useState(() => {
    const saved = localStorage.getItem("selectedCategories");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("fileName", fileName);
  }, [fileName]);

  useEffect(() => {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(Array.from(selectedCategories))
    );
  }, [selectedCategories]);

  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        fileName,
        setFileName,
        selectedCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
