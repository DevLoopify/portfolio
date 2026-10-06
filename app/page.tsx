import Image from "next/image";
import Link from "next/link";
import SocialIcon from "./components/SocialIcon";
import Shell from "./components/Shell";
import Tamagotchi from "./components/Tamagotchi";
import Typed from "./components/Typed";
import { about, books, career, hardwareProjects, profile, softwareProjects, type Project } from "./data";

function Heading({ path, title, id }: { path: string; title: string; id: string }) {
  return (
    <header className="sec-head">
      <span className="prompt" aria-hidden>
        ~/{path}
      </span>
      <h2 id={`${id}-title`}>{title}</h2>
    </header>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link className="card card-link" href={`/projects/${p.slug}`}>
            <Image
              className="card-img"
              src={p.image}
              alt=""
              width={640}
              height={360}
              unoptimized={p.image.endsWith(".svg")}
            />
            <h3>
              {p.name}
              <span className="arrow" aria-hidden>→</span>
            </h3>
            <p>{p.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
      <Shell>
          <section id="hero" className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
            <p className="prompt" aria-hidden>
              $ whoami
            </p>
            <h1 id="hero-title">
              Hi, I&apos;m <span className="hl">{profile.name}</span>.
            </h1>
            <p className="lead">
              <Typed text={profile.tagline} />
            </p>
            <div className="actions">
              <a className="btn btn-primary" href="#software">
                See my work
              </a>
              <ul className="socials" aria-label="Contact and social links">
                {profile.socials.map((l) => (
                  <li key={l.id}>
                    <a
                      className="social"
                      href={l.href}
                      aria-label={l.label}
                      title={l.label}
                      style={{ "--brand": l.color } as React.CSSProperties}
                      {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                    >
                      <SocialIcon id={l.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Tamagotchi />
          </section>

          <section id="about" aria-labelledby="about-title">
            <Heading id="about" path="about" title="About me" />
            <div className="about">
              <div>
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="tech-card">
                <p className="tech-label">Here are some technologies I have worked with:</p>
                <ul className="tech">
                  {about.technologies.map((t) => (
                    <li key={t.name}>
                      <span className="tech-tile">
                        <Image src={t.logo} alt="" width={64} height={64} unoptimized />
                      </span>
                      <span className="tech-name">{t.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="career" aria-labelledby="career-title">
            <Heading id="career" path="career" title="Career" />
            <ol className="timeline">
              {career.map((job) => (
                <li key={job.company + job.period}>
                  <p className="period">{job.period}</p>
                  <h3>
                    {job.role} <span className="muted">· {job.company}</span>
                  </h3>
                  <ul className="points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <section id="software" aria-labelledby="software-title">
            <Heading id="software" path="projects/software" title="Software projects" />
            <ProjectGrid projects={softwareProjects} />
          </section>

          <section id="hardware" aria-labelledby="hardware-title">
            <Heading id="hardware" path="projects/hardware" title="Hardware projects" />
            <ProjectGrid projects={hardwareProjects} />
          </section>

          <section id="books" aria-labelledby="books-title">
            <Heading id="books" path="books" title="Books I've read" />
            <ul className="books">
              {books.map((b) => (
                <li key={b.title} className="book">
                  <Image src={b.cover} alt="" width={180} height={270} className="book-cover" />
                  <h3>{b.title}</h3>
                </li>
              ))}
            </ul>
          </section>
      </Shell>
  );
}
