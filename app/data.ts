// All portfolio content lives here. Replace the placeholder text with your own.

export const profile = {
  name: "Ben",
  role: "Software & hardware tinkerer",
  tagline: "I build things that live on screens and things you can hold.",
  location: "Somewhere on Earth",
  email: "yodamaddog@gmail.com",
  // Replace these with your real profiles. Icons are shown in this order.
  socials: [
    { id: "email", label: "Email", href: "mailto:yodamaddog@gmail.com", color: "#4ade80" },
    { id: "github", label: "GitHub", href: "https://github.com/", color: "#e6edf3" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/", color: "#0a66c2" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/", color: "#e4405f" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/", color: "#25f4ee" },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/", color: "#ff0033" },
  ],
};

export const about = {
  paragraphs: [
    "Hi! I'm Ben. I like making things work, from web apps to little circuit boards that blink, beep, or water the plants.",
    "I care about clear communication, tidy code, and tools that people actually enjoy using. Outside of work you'll find me with a soldering iron, a good book, or a cat on my keyboard.",
  ],
  technologies: [
    { name: "C++", logo: "/tech/cplusplus.svg" },
    { name: "Rust", logo: "/tech/rust.svg" },
    { name: "Go", logo: "/tech/go.svg" },
    { name: "TypeScript", logo: "/tech/typescript.svg" },
    { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
  ],
};

export const career = [
  {
    role: "Senior Software Engineer",
    company: "Company Name",
    period: "2023 – Present",
    points: [
      "Led the rebuild of a customer-facing dashboard used by thousands of people daily.",
      "Mentored junior engineers and introduced a lightweight code review process.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Another Company",
    period: "2020 – 2023",
    points: [
      "Shipped features across the full stack, from database to UI.",
      "Cut page load times by 40% through profiling and caching improvements.",
    ],
  },
  {
    role: "Junior Developer",
    company: "First Company",
    period: "2018 – 2020",
    points: ["Started here, learned a lot, broke a few things, fixed them all."],
  },
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  /** Cover image shown on the card and at the top of the project page (put files in /public/projects). */
  image: string;
  /** Optional external link, shown as a button on the project page. */
  href?: string;
  /** The write-up on the project page. Each answer is a list of paragraphs. */
  story: {
    about: string[];
    difficult: string[];
    different: string[];
    learned: string[];
  };
};

const placeholderStory = (subject: string): Project["story"] => ({
  about: [
    `Write a few sentences here about what ${subject} is, who it is for, and why you built it.`,
    "A second paragraph is a good place for the story of how the idea started.",
  ],
  difficult: [
    "Describe the hardest part: a bug that took days, a design decision you went back and forth on, or something you had never done before.",
  ],
  different: [
    "Be honest about what you would change: a different technology, more planning up front, or testing earlier.",
  ],
  learned: [
    "Summarise the skills and lessons you took away. Hiring managers love this part.",
  ],
});

export const softwareProjects: Project[] = [
  {
    slug: "project-one",
    name: "Project One",
    description: "A short, friendly description of what this does and why it matters.",
    image: "/projects/project-one.svg",
    href: "https://github.com/",
    story: placeholderStory("Project One"),
  },
  {
    slug: "project-two",
    name: "Project Two",
    description: "Another project. Mention the problem you solved and the outcome.",
    image: "/projects/project-two.svg",
    href: "https://github.com/",
    story: placeholderStory("Project Two"),
  },
  {
    slug: "project-three",
    name: "Project Three",
    description: "A smaller experiment or open-source contribution worth showing off.",
    image: "/projects/project-three.svg",
    story: placeholderStory("Project Three"),
  },
];

export const hardwareProjects: Project[] = [
  {
    slug: "smart-plant-waterer",
    name: "Smart Plant Waterer",
    description: "A soil-moisture sensor and pump that keeps the office plant alive.",
    image: "/projects/smart-plant-waterer.svg",
    story: placeholderStory("the plant waterer"),
  },
  {
    slug: "custom-keyboard",
    name: "Custom Mechanical Keyboard",
    description: "Hand-wired split keyboard with custom firmware and a printed case.",
    image: "/projects/custom-keyboard.svg",
    story: placeholderStory("the keyboard"),
  },
  {
    slug: "desk-weather-station",
    name: "Desk Weather Station",
    description: "Tiny e-ink display showing the forecast, powered by a Raspberry Pi.",
    image: "/projects/desk-weather-station.svg",
    story: placeholderStory("the weather station"),
  },
];

export const allProjects: (Project & { kind: "software" | "hardware" })[] = [
  ...softwareProjects.map((p) => ({ ...p, kind: "software" as const })),
  ...hardwareProjects.map((p) => ({ ...p, kind: "hardware" as const })),
];

export type Book = {
  title: string;
  /** Cover image (put files in /public/books). */
  cover: string;
};

export const books: Book[] = [
  { title: "The Pragmatic Programmer", cover: "/books/the-pragmatic-programmer.jpg" },
  { title: "Project Hail Mary", cover: "/books/project-hail-mary.jpg" },
  { title: "The Design of Everyday Things", cover: "/books/design-of-everyday-things.jpg" },
  { title: "Designing Data-Intensive Applications", cover: "/books/designing-data-intensive-applications.jpg" },
  { title: "The Soul of a New Machine", cover: "/books/soul-of-a-new-machine.jpg" },
  { title: "Atomic Habits", cover: "/books/atomic-habits.jpg" },
];
