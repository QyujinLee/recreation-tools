"use client";

import React, { useRef, useState } from "react";
import style from "./page.module.scss";

export default function TimerPage() {
  const [inputTime, setInputTime] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (isRunning || !inputTime) return;

    const timeParts = inputTime.split(":").map((part) => parseInt(part, 10));
    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      const totalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
      setTime(totalTime);
      setIsRunning(true);

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTime(0);
    setInputTime("");
  };

  const formatTime = (time: number) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px", marginBottom: "40px" }}>
        {formatTime(time)}
      </div>
      <input
        type="text"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        placeholder="HH:MM:SS"
        style={{ fontSize: "18px", padding: "10px", marginBottom: "20px" }}
      />
      <br />
      <button
        onClick={start}
        disabled={isRunning}
        style={{ fontSize: "18px", padding: "10px 20px", margin: "5px" }}
      >
        Start
      </button>
      <button
        onClick={reset}
        style={{ fontSize: "18px", padding: "10px 20px", margin: "5px" }}
      >
        Reset
      </button>
    </div>
  );
}
