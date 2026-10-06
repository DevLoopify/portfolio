"use client";

import { useEffect, useState } from "react";

// Types the text out once. The full text stays available to screen readers.
export default function Typed({ text, delay = 350, speed = 45 }: { text: string; delay?: number; speed?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = reduce ? text.length : i + 1;
      setN(i);
      if (i < text.length) t = setTimeout(tick, speed);
    };
    t = setTimeout(tick, reduce ? 0 : delay);
    return () => clearTimeout(t);
  }, [text, delay, speed]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, n)}
        <span className="caret" />
      </span>
    </>
  );
}
