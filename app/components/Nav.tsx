"use client";

import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "hero", label: "home" },
  { id: "about", label: "about" },
  { id: "career", label: "career" },
  { id: "software", label: "software" },
  { id: "hardware", label: "hardware" },
  { id: "books", label: "books" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a href={`/#${id}`} className={active === id ? "nav-link is-active" : "nav-link"} aria-current={active === id ? "true" : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
