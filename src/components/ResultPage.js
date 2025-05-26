import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import downloadTextFile from "./downloadTextFile";
import { useBlocks } from "../context/BlocksContext";
import { useApp } from "../context/AppContext";
import "../style/ResultEditStyles.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { blocks } = useBlocks();
  const {
    file,
    setFile,
    fileName,
    setFileName,
    selectedCategories,
    setSelectedCategories,
  } = useApp();

  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVideoUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="page-wrapper">
      <h1 className="header-title">Y-IS</h1>
      <div className="card">
        {/* 항상 flex-row 유지 */}
        <div className="flex-row">
          <div className="video-container">
            {videoUrl ? (
              <video controls className="video-player">
                <source src={videoUrl} type={file?.type || "video/mp4"} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "12px",
                }}
              />
            )}
          </div>

          <div className="text-container">
            <div>
              <div className="label">제목</div>
              <div className="value-box">{fileName}</div>
            </div>
            <div style={{ marginTop: "12px" }}>
              <div className="label">카테고리</div>
              <div className="value-box">
                {Array.from(selectedCategories).join(", ")}
              </div>
            </div>
          </div>
        </div>

        <div className="timestamp-box">
          {blocks.map((b, i) => (
            <div key={i}>
              {formatTime(b.timestamp)} {b.chapter_title}
            </div>
          ))}
        </div>

        <div className="button-row">
          <button onClick={() => navigate("/edit")} className="button">
            ✏️ 수정하기
          </button>
          <button
            onClick={() =>
              downloadTextFile(blocks, () => {
                navigate("/complete");
              })
            }
            className="button"
          >
            📄 텍스트로 저장
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else {
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
}
