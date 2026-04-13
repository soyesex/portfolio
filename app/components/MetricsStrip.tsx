"use client";

import { useEffect, useState } from "react";

function getUTCTime(): string {
  const now = new Date();
  return now.toISOString().slice(11, 19);
}

const metrics = [
  "1,248 bugs found",
  "94.2% test coverage",
  "2 yrs shipping",
];

export default function MetricsStrip() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(getUTCTime());
    const interval = setInterval(() => {
      setTime(getUTCTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-4 border-y border-white/[0.08] bg-black">
      <div className="flex justify-between px-8 font-mono text-[11px] tracking-[0.2em] uppercase">
        {metrics.map((metric, i) => (
          <span key={i} className="text-white/40 hidden md:inline">
            {metric}
          </span>
        ))}
        <span className="text-white">
          utc {time}
        </span>
      </div>
    </div>
  );
}
