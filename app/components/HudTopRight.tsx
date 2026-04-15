"use client";

import { useEffect, useState } from "react";

/** Returns current time in Colombia timezone (COT = UTC-5, no DST) */
function getCOTTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Bogota",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function HudTopRight() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(getCOTTime());
    const interval = setInterval(() => setTime(getCOTTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-right font-mono text-[9px] md:text-[11px] uppercase leading-loose self-end md:self-auto">
      <p className="text-white/60">system telemetry</p>
      <p className="text-white/60">session 0x8f2a</p>
      <p>
        <span className="text-white/60">cot&nbsp;</span>
        <span className="text-white">{time}</span>
      </p>
    </div>
  );
}
