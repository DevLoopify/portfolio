import Nav from "./Nav";
import { profile } from "../data";

// The terminal window every page lives in: title bar with navigation, content, footer.
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="window">
      <div className="titlebar">
        <span className="dots" aria-hidden>
          <i /> <i /> <i />
        </span>
        <span className="title">{profile.name.toLowerCase()}@portfolio</span>
        <Nav />
      </div>

      <main className="screen">
        {children}
        <footer className="foot">
          <span className="prompt" aria-hidden>
            $
          </span>{" "}
          Thanks for stopping by.
        </footer>
      </main>
    </div>
  );
}
