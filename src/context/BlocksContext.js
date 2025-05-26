import { createContext, useContext, useState, useEffect } from "react";

const BlocksContext = createContext();

export function BlocksProvider({ children }) {
  //json불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/summaryData.json");
        if (!response.ok) throw new Error("데이터 로드 실패");
        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching summaryData.json:", error);
      }
    };
    fetchData();
  }, []);

  const [blocks, setBlocks] = useState(() => {
    try {
      const stored = localStorage.getItem("blocks");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("로컬 저장된 blocks 파싱 실패:", err);
      return [];
    }
  });

  // ✅ blocks가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  return (
    <BlocksContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlocksContext.Provider>
  );
}

export function useBlocks() {
  return useContext(BlocksContext);
}
