"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const WORK_TIME = 25 * 60; // 25 min
const BREAK_TIME = 5 * 60; // 5 min

export function Pomodoro() {
  // use the module-level WORK_TIME and BREAK_TIME constants
  const [secondsLeft, setSecondsLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Switch mode
  useEffect(() => {
    if (secondsLeft <= 0) {
      const timeout = setTimeout(() => {
        if (mode === "work") {
          setMode("break");
          setSecondsLeft(BREAK_TIME);
        } else {
          setMode("work");
          setSecondsLeft(WORK_TIME);
        }
      }, 100); // petit délai pour éviter l'effet synchrone immédiat

      return () => clearTimeout(timeout);
    }
  }, [secondsLeft, mode]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  // compute circular progress based on remaining seconds
  // compute circular progress so the ring FILLS as time passes
  const totalTime = mode === "work" ? WORK_TIME : BREAK_TIME;
  const remainingFraction = Math.max(0, Math.min(1, secondsLeft / totalTime));

  // SVG ring geometry
  const size = 120; // viewBox size
  const radius = 60; // increased radius to give more inner gap
  const stroke = 6; // slightly thinner stroke so it doesn't crowd the text
  const circumference = 2 * Math.PI * radius;
  // dashoffset should be circumference when timer starts (empty) and 0 when finished (full)
  const dashoffset = circumference * remainingFraction;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "work" ? "Objectif : Concentré" : "Recharge d’énergie"}
      </h2>

      {/* Timer with circular progress */}
      <div className="progress-ring w-44 h-44">
        <div className="outer-ring" aria-hidden />
        <svg viewBox={`0 0 ${size} ${size}`} className="pointer-events-none">
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            <circle
              className="progress-ring__bg"
              r={radius}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              cx="0"
              cy="0"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={0}
            />
            <circle
              className={`progress-ring__circle stroke-accent`}
              r={radius}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              cx="0"
              cy="0"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset: dashoffset }}
            />
          </g>
        </svg>

        {/* explicit outer ring element (easier to animate reliably than pseudo-elements) */}
        <div
          className={`outer-ring ${isRunning ? "animate" : ""}`}
          aria-hidden
        />

        <div className="relative z-20 flex items-center justify-center w-full h-full">
          <span className="text-5xl font-mono">{formatTime(secondsLeft)}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="button-ring">
          <Button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            setIsRunning(false);
            setMode("work");
            setSecondsLeft(WORK_TIME);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
