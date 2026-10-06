"use client";

import { useEffect, useRef, useState } from "react";

type Mood = "idle" | "hi" | "snack" | "nap" | "pet";

// Pixel art on a 16 x 15 grid. F = body, n = light belly / ear, b = cheek.
const BODY = [
  "..FF........FF..",
  "..FnF......FnF..",
  "..FFFFFFFFFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFFFFFFFFF..",
  "..FFFFFFFFFFFF..",
  "..FbFFFnnFFFbF..",
  "...FFFFFFFFFF...",
  "....FFFFFFFF....",
  "...FFFFFFFFFF...",
  "...FFFnnnnFFF...",
  "...FFFnnnnFFF...",
  "...FFFF..FFFF...",
];
const FILL: Record<string, string> = { F: "var(--pix)", n: "var(--pix-hi)", b: "var(--pix-cheek)" };
const BODY_PIXELS = BODY.flatMap((row, y) =>
  [...row].flatMap((ch, x) => (ch === "." ? [] : [{ x, y, fill: FILL[ch] }])),
);

const pts = (s: string) => s.split(" ").map((p) => p.split(",").map(Number) as [number, number]);
const ARM = pts("13,10 13,9 14,9 14,8 14,7 14,6 14,5 15,5 15,4 14,4");
const TAIL = pts("2,11 1,11 1,10 1,9 0,9 0,8");
const FISH = pts("10,13 11,13 12,13 13,13 14,12 14,13 14,14");
const EYES_OPEN = pts("4,4 5,4 4,5 5,5 10,4 11,4 10,5 11,5");
const EYES_HAPPY = pts("4,5 5,4 6,5 9,5 10,4 11,5");
const EYES_SLEEP = pts("4,5 5,5 10,5 11,5");
const SMILE = pts("6,7 7,8 8,8 9,7");
const MOUTH_OPEN = pts("7,7 8,7 7,8 8,8");

const CAPTION: Record<Mood, string> = {
  idle: "WELCOME!",
  hi: "HELLO!",
  snack: "NOM NOM",
  nap: "ZZZ...",
  pet: "PRRR",
};

const MAX_LOVE = 5;

function Px({ cells, fill }: { cells: [number, number][]; fill: string }) {
  return (
    <>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill} />
      ))}
    </>
  );
}

export default function Tamagotchi() {
  const [mood, setMood] = useState<Mood>("idle");
  const [love, setLove] = useState(2);
  const [pulse, setPulse] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const act = (next: Exclude<Mood, "idle">, ms: number, gain = 1) => {
    clearTimeout(timer.current);
    setMood(next);
    if (gain) {
      setLove((l) => Math.min(MAX_LOVE, l + gain));
      setPulse((p) => p + 1);
    }
    timer.current = setTimeout(() => setMood("idle"), ms);
  };

  const wakeOrNap = () => {
    if (mood === "nap") {
      clearTimeout(timer.current);
      setMood("idle");
    } else {
      act("nap", 6000, 0);
    }
  };

  const eyes = mood === "nap" ? EYES_SLEEP : mood === "pet" || mood === "hi" ? EYES_HAPPY : EYES_OPEN;

  return (
    <div className="gotchi-wrap">
      <div className="gotchi" role="group" aria-label="Virtual pet cat">
        <p className="gotchi-brand" aria-hidden>
          meowgotchi
        </p>

        <div className={`lcd lcd-${mood}`}>
          <div className="lcd-top" aria-hidden>
            <span className="lcd-hearts">
              {"♥".repeat(love)}
              <span className="off">{"♥".repeat(MAX_LOVE - love)}</span>
            </span>
            <span>MOCHI</span>
          </div>

          <button type="button" className="lcd-cat" onClick={() => act("pet", 1800)} aria-label="Pet the cat">
            <svg viewBox="0 0 16 15" shapeRendering="crispEdges" aria-hidden>
              <g className="px-tail">
                <Px cells={TAIL} fill="var(--pix)" />
              </g>
              <g className="px-all">
                {BODY_PIXELS.map((p) => (
                  <rect key={`${p.x}-${p.y}`} x={p.x} y={p.y} width="1" height="1" fill={p.fill} />
                ))}
                <g className="px-eyes">
                  <Px cells={eyes} fill="var(--pix-dark)" />
                </g>
                <Px cells={mood === "snack" ? MOUTH_OPEN : SMILE} fill="var(--pix-dark)" />
                <g className="px-arm">
                  <Px cells={ARM} fill="var(--pix)" />
                </g>
              </g>
              {mood === "snack" && (
                <g className="px-fish">
                  <Px cells={FISH} fill="var(--pix-hi)" />
                  <Px cells={[[10, 13]]} fill="var(--pix-dark)" />
                </g>
              )}
            </svg>
            {mood === "nap" && (
              <span className="lcd-z" aria-hidden>
                z<span>Z</span>
              </span>
            )}
            {(mood === "pet" || mood === "snack") && (
              <span key={pulse} className="lcd-heart" aria-hidden>
                ♥
              </span>
            )}
          </button>

          <p className="lcd-caption" aria-live="polite">
            {love === MAX_LOVE && mood === "idle" ? "SO HAPPY!" : CAPTION[mood]}
          </p>
        </div>

        <div className="gotchi-keys">
          <div>
            <button type="button" className="gkey" onClick={() => act("hi", 2600)} aria-label="Say hi to the cat">
              A
            </button>
            <span>hi</span>
          </div>
          <div>
            <button type="button" className="gkey" onClick={() => act("snack", 2400)} aria-label="Give the cat a snack">
              B
            </button>
            <span>snack</span>
          </div>
          <div>
            <button
              type="button"
              className="gkey"
              onClick={wakeOrNap}
              aria-label={mood === "nap" ? "Wake the cat up" : "Let the cat take a nap"}
            >
              C
            </button>
            <span>{mood === "nap" ? "wake" : "nap"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
