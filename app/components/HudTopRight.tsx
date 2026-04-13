"use client";

import { useEffect, useState } from "react";

function getUTCTime(): string {
  const now = new Date();
  return now.toISOString().slice(11, 19);
}

export default function HudTopRight() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(getUTCTime());
    const interval = setInterval(() => {
      setTime(getUTCTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-8 right-8 z-10 text-right font-mono text-[11px] uppercase leading-loose">
      <p className="text-white/60">system telemetry</p>
      <p className="text-white/60">session 0x8f2a</p>
      <p>
        <span className="text-white/60">utc </span>
        <span className="text-white">{time}</span>
      </p>
    </div>
  );
}
