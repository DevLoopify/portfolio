import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "../../components/Shell";
import { allProjects, profile } from "../../data";

const QUESTIONS = [
  { key: "about", title: "What was it about?" },
  { key: "difficult", title: "What was difficult?" },
  { key: "different", title: "What would I do differently next time?" },
  { key: "learned", title: "What have I learned?" },
] as const;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} · ${profile.name}`, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const label = project.kind === "software" ? "Software project" : "Hardware project";

  return (
    <Shell>
      <article className="project">
        <Link className="back" href={`/#${project.kind}`}>
          ← Back to {project.kind} projects
        </Link>

        <Image
          className="project-cover"
          src={project.image}
          alt={`Cover image for ${project.name}`}
          width={1280}
          height={720}
          priority
          unoptimized={project.image.endsWith(".svg")}
        />

        <header className="project-head">
          <span className="prompt" aria-hidden>
            ~/projects/{project.slug}
          </span>
          <p className="kind">{label}</p>
          <h1>{project.name}</h1>
          <p className="lead-text">{project.description}</p>
          {project.href && (
            <a className="btn btn-primary" href={project.href} target="_blank" rel="noreferrer">
              View on GitHub ↗
            </a>
          )}
        </header>

        <div className="story">
          {QUESTIONS.map((q, i) => (
            <section key={q.key} aria-labelledby={`${q.key}-title`}>
              <h2 id={`${q.key}-title`}>
                <span className="num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {q.title}
              </h2>
              {project.story[q.key].map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Shell>
  );
}
