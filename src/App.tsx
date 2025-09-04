import { useEffect, useState, useRef, type CSSProperties } from "react";
import type React from "react";
import {
  Github, Linkedin, Mail, ExternalLink, Menu, X,
  Code2, Atom, Database, Brain
} from "lucide-react";

// ---- View counter ----
import ViewCounter from "./components/ViewCounter";

// **** logo & project image imports ****
import IIITLogo from "./assets/WXlogo/IIIT_logo_transparent.gif";
import NaturescanLogo from "./assets/WXlogo/naturescan.jpg";
import PacecomLogo from "./assets/WXlogo/pacecom.jpg";

import ComingSoonImg from "./assets/projects/comingsoon.jpg";
import SelfDrivingBusImg from "./assets/projects/selfdrivingbus.jpg";
import ESGBankImg from "./assets/projects/ESGBank.png";

// ==== LOCAL TECH ICONS ====
import apacheairflow from "./assets/icons/apacheairflow.svg";
import cppIcon from "./assets/icons/Cpp.svg";
import dbtIcon from "./assets/icons/dbt.svg";
import dockerIcon from "./assets/icons/docker.svg";
import gitIcon from "./assets/icons/git.svg";
import javascriptIcon from "./assets/icons/javascript.svg";
import jirasoftwareIcon from "./assets/icons/jirasoftware.svg";
import openaigymIcon from "./assets/icons/openaigym.svg";
import powerBiIcon from "./assets/icons/power-bi.svg";
import postgresqlIcon from "./assets/icons/postgresql.svg";
import pythonIcon from "./assets/icons/python.svg";
import reactIcon from "./assets/icons/react.svg";
import snowflakeIcon from "./assets/icons/snowflake.svg";
import sqliteIcon from "./assets/icons/sqlite.svg";
import tableauIcon from "./assets/icons/tableau-software.svg";
import tailwindIcon from "./assets/icons/tailwindcss.svg";
import typescriptIcon from "./assets/icons/typescript.svg";

import resumePdf from "./assets/Adithya_Varambally_Resume.pdf";

// ---------- Utils ----------
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

// ---------- Shared UI ----------
const Container = ({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>
    <div className="mx-auto w-full max-w-6xl px-6 md:px-8">{children}</div>
  </section>
);

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${className}`}>
    {children}
  </span>
);

// ---------- Button ----------
type AnchorProps = React.ComponentProps<"a"> & { as?: "a" };
type NativeButtonProps = React.ComponentProps<"button"> & { as?: "button" };
type ButtonProps = AnchorProps | NativeButtonProps;

const Button = ({ as = "button", children, className = "", ...props }: ButtonProps) => {
  if (as === "a") {
    const { href, ...rest } = props as AnchorProps;
    return (
      <a
        href={href}
        className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow ${className}`}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow ${className}`}
      {...(props as NativeButtonProps)}
    >
      {children}
    </button>
  );
};

// ---------- Scroll spy ----------
const useScrollSpy = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { rootMargin: "-60% 0px -35% 0px", threshold: [0, 0.2, 0.5, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(",")]);
  return active;
};

// ---------- NAV ----------
const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Nav = () => {
  const active = useScrollSpy(sections.map((s) => s.id));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-8">
        <a href="#home" className="group inline-flex items-center gap-2 font-bold">
          <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-400 grid place-items-center text-white shadow">A</span>
          <span className="tracking-tight">Adithya Varambally</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${active === s.id ? "bg-black text-white" : "hover:bg-neutral-100"}`}
              aria-current={active === s.id ? "page" : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://github.com/adithya22-glitch" target="_blank" className="hidden md:inline-flex p-2 rounded-xl hover:bg-neutral-100" aria-label="GitHub" rel="noreferrer">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/adithya-varambally-m/" target="_blank" className="hidden md:inline-flex p-2 rounded-xl hover:bg-neutral-100" aria-label="LinkedIn" rel="noreferrer">
            <Linkedin className="h-5 w-5" />
          </a>
          <button className="md:hidden p-2 rounded-xl hover:bg-neutral-100" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-6 py-2">
            <nav className="grid gap-1">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={`rounded-xl px-3 py-2 text-sm font-medium ${active === s.id ? "bg-black text-white" : "hover:bg-neutral-100"}`}>
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

/* ===== Reveal-on-scroll ===== */
const useInViewOnce = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);

  return { ref, inView };
};

const Reveal = ({
  as: Tag = "div",
  className = "",
  children,
  amount = 0.2,
}: {
  as?: any;
  className?: string;
  children: React.ReactNode;
  amount?: number;
}) => {
  const { ref, inView } = useInViewOnce({ threshold: amount, rootMargin: "0px 0px -10% 0px" });
  return (
    <Tag ref={ref} className={`reveal ${inView ? "reveal--in" : ""} ${className}`}>
      {children}
    </Tag>
  );
};

// === Golden Fibonacci Background ===
const GoldenBackground = () => {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const fibs = [1, 1, 2, 3, 5, 8, 13, 21];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {fibs.map((f, i) => {
        const base = 18;
        const sq = base * f;
        const isLandscape = i % 2 === 0;
        const w = (isLandscape ? sq * PHI : sq) * 12;
        const h = (isLandscape ? sq : sq * PHI) * 12;

        const hue = (f * 137.5) % 360;
        const hue2 = (hue + 55) % 360;
        const gradient = `radial-gradient(70% 90% at 50% 50%,
          hsl(${hue} 80% 60% / .35) 0%,
          hsl(${hue2} 80% 55% / .35) 60%,
          transparent 100%)`;

        const delay    = `${(f * 0.25).toFixed(2)}s`;
        const rotDur   = `${22 + i * 3}s`;
        const floatDur = `${10 + i * 2}s`;
        const gradDur  = `${16 + i * 2}s`;
        const opacity  = Math.min(0.75, 0.22 + i * 0.06);

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 fib-rotate"
            style={
              {
                width: w,
                height: h,
                transform: "translate(-50%, -50%)",
                ["--delay" as any]: delay,
                ["--rotDur" as any]: rotDur,
              } as CSSProperties
            }
          >
            <div
              className="fib-float rounded-[28px] mix-blend-multiply"
              style={
                {
                  width: "100%",
                  height: "100%",
                  backgroundImage: gradient,
                  opacity,
                  ["--delay" as any]: delay,
                  ["--floatDur" as any]: floatDur,
                  ["--gradDur" as any]: gradDur,
                } as CSSProperties
              }
            />
          </div>
        );
      })}
    </div>
  );
};

// ---------- HERO ----------
const Hero = () => {
  return (
    <Container id="home" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background:radial-gradient(1200px_600px_at_50%_-10%,theme(colors.blue.200),transparent_60%)]" />
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Badge className="font-box">Data • AI • Engineering</Badge>
          <Reveal as="h1" className="font-headers mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Building useful AI-powered products & data systems
          </Reveal>
          <p className="mt-4 text-neutral-600 text-base md:text-lg">
            I’m a Berlin-based builder focused on clean data pipelines, LLM apps and fast, accessible interfaces.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button as="a" href="#contact">Contact <Mail className="h-4 w-4" /></Button>
          </div>

          {/* Global site views */}
        </div>
        <div className="relative">
          <div className="aspect-video w-full rounded-3xl border shadow-sm bg-gradient-to-br from-neutral-50 to-neutral-100 grid place-items-center">
            <div className="text-center p-8">
              <div className="font-headers text-6xl md:text-7xl font-black tracking-tighter">AV</div>
              <p className="mt-2 text-sm text-neutral-500">Creative technologist & data engineer</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

// ---------- SKILLS ----------
type Skill = { name: string; src: string };

const SKILLS: Skill[] = [
  { name: "JavaScript", src: javascriptIcon },
  { name: "C++", src: cppIcon },
  { name: "TypeScript", src: typescriptIcon },
  { name: "Python", src: pythonIcon },
  { name: "React", src: reactIcon },
  { name: "TailwindCSS", src: tailwindIcon },
  { name: "Node / npm", src: javascriptIcon },
  { name: "Sqllite", src: sqliteIcon },
  { name: "PostgreSQL", src: postgresqlIcon },
  { name: "Git", src: gitIcon },
  { name: "Docker", src: dockerIcon },
  { name: "dbt", src: dbtIcon },
  { name: "Airflow", src: apacheairflow },
  { name: "Snowflake", src: snowflakeIcon },
  { name: "Tableau", src: tableauIcon },
  { name: "Power BI", src: powerBiIcon },
  { name: "Jira", src: jirasoftwareIcon },
  { name: "OpenAI Gym", src: openaigymIcon },
];

const HexBadge = ({ src, alt }: { src: string; alt: string }) => {
  const hexClip =
    "polygon(30% 0%, 70% 0%, 95% 20%, 100% 50%, 95% 80%, 70% 100%, 30% 100%, 5% 80%, 0% 50%, 5% 20%)";

  return (
    <div
      className="h-24 w-24 md:h-28 md:w-28 grid place-items-center transition-transform duration-300 hover:-translate-y-1"
      style={{
        clipPath: hexClip,
        background:
          "radial-gradient(120% 120% at 10% 10%, #aaa 0%, #999 25%, #777 55%, #666 100%)",
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,.25), inset 0 -4px 8px rgba(0,0,0,.25), 0 10px 18px rgba(0,0,0,.2)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-10 w-10 md:h-12 md:w-12 drop-shadow"
        style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,.4))" }}
      />
    </div>
  );
};

const Skills = () => (
  <Container id="skills" className="relative">
    <p className="font-box text-center text-xs tracking-[0.3em] text-neutral-400">TECHNICAL SKILLS</p>
    <Reveal as="h2" className="font-headers mt-2 text-center text-4xl md:text-5xl font-black tracking-tight">
      Main Tech Stack<span className="">.</span>
    </Reveal>

    <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-8 gap-y-10 place-items-center">
      {SKILLS.filter(s => !!s.src).map((s) => (
        <div key={s.name} className="flex flex-col items-center gap-3">
          <HexBadge src={s.src} alt={s.name} />
          <span className="text-sm text-neutral-400">{s.name}</span>
        </div>
      ))}
    </div>
  </Container>
);

// ---------- ABOUT ----------
type SkillCard = {
  title: string;
  subtitle: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const aboutSkills: SkillCard[] = [
  { title: "Data Scientist",  subtitle: "Modeling, experimentation, insights", Icon: Brain },
  { title: "Data Engineer",   subtitle: "Pipelines, ELT, orchestration",       Icon: Database },
  { title: "AI/ML Engineer",  subtitle: "LLMs, MLOps, inference",               Icon: Atom },
  { title: "BI Developer",    subtitle: "Dashboards, metrics, storytelling",    Icon: Code2 },
];

const About = () => (
  <Container id="about" className="text-neutral-800">
    <p className="font-box text-xs tracking-[0.3em] text-neutral-500">INTRODUCTION</p>
    <Reveal as="h2" className="font-headers mt-2 text-5xl md:text-6xl font-black tracking-tight text-black">
      Overview<span className="text-black">.</span>
    </Reveal>

    <div className="mt-6 max-w-3xl leading-8 text-neutral-700">
      <p>
        Hi, I’m Adithya — passionate about shaping the future with data and AI.
        From building reliable data pipelines that power decisions, to developing
        intelligent models that learn from complex information, to applying computer
        vision that helps machines “see” the world — I thrive at the intersection
        of engineering and intelligence.
      </p>
      <p className="mt-4">
        While my dream role is as a Data Scientist, I bring equal energy to positions
        like Data Engineer, AI/ML Engineer, or BI Developer. What excites me most is
        taking raw data and transforming it into insights and innovations that make a
        real difference.
      </p>
      <p className="mt-4">
        My focus: attention to detail, data integrity, problem-solving, and efficiency
        optimization — values that ensure every solution I build is not just functional,
        but impactful.
      </p>
    </div>

    {/* Inline Skills cards */}
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {aboutSkills.map(({ title, subtitle, Icon }) => (
        <div
          key={title}
          className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-neutral-100 text-neutral-900">
            <Icon className="h-10 w-10" aria-hidden="true" />
          </div>
          <div className="font-headers text-lg font-extrabold tracking-tight">{title}</div>
          <p className="font-box mt-1 text-xs text-neutral-600">{subtitle}</p>
        </div>
      ))}
    </div>
  </Container>
);

// ---------- EXPERIENCE ----------
type ExpItem = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  image: string;
};

const experienceData: ExpItem[] = [
  {
    title: "Web Developer",
    company: "NatureScan LLP, Bengaluru",
    period: "07/2022 – 03/2023",
    bullets: [
      "Shipped high-performance sites; +12% revenue & reach uplift above forecast.",
      "Launched user-centric features that grew traffic and digital asset value.",
      "Improved SEO and cross-browser reliability with testing & optimizations.",
    ],
    image: NaturescanLogo,
  },
  {
    title: "Trainee-Engineer",
    company: "Pacecom Technologies Pvt. Ltd., Bengaluru",
    period: "06/2021 – 04/2022",
    bullets: [
      "Enhanced model accuracy (+15%) and cut false positives (–10%) via metrics & confusion-matrix analysis.",
      "Generated cross-validation reports for 10k+ annotations to ensure model reliability.",
      "Delivered ADAS/iris-detection prototypes and analytics for automotive clients (e.g., VEONEER, APTIV).",
    ],
    image: PacecomLogo,
  },
  {
    title: "Intern",
    company: "Indian Institute of Information Technology (IIIT) Allahabad",
    period: "07/2019 – 08/2019",
    bullets: [
      "Built an Image Processing unit using Optical Flow in Python.",
      "Optimized for real-time CCTV insights with minimal compute.",
      "Improved interpretation of live streams for resource-limited settings.",
    ],
    image: IIITLogo,
  },
];

const Dot = () => (
  <span className="relative z-10 inline-block h-3 w-3 rounded-full bg-black ring-4 ring-white" />
);

const Experience = () => (
  <Container id="experience" className="relative">
    <p className="font-box text-xs tracking-[0.3em] text-neutral-500">WHAT I HAVE DONE SO FAR</p>
    <Reveal as="h2" className="font-headers mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
      Work Experience<span>.</span>
    </Reveal>

    {/* timeline line */}
    <div className="relative mt-10">
      <div className="absolute left-1/2 top-0 -ml-px h-full w-px bg-neutral-200 md:block hidden" aria-hidden />
      <ol className="space-y-16">
        {experienceData.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <li key={item.title + item.company} className="relative grid md:grid-cols-2 md:gap-8">
              {/* connector + dot */}
              <div className="absolute left-1/2 -ml-1 hidden md:block">
                <Dot />
              </div>

              {/* card side */}
              <div className={`${isLeft ? "md:pr-8 md:col-start-1" : "md:pl-8 md:col-start-2"} md:row-start-1`}>
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-headers text-lg font-bold tracking-tight">
                      {item.title}
                      <span className="text-neutral-500"> · {item.company}</span>
                    </div>
                    <div className="text-sm text-neutral-500">{item.period}</div>
                  </div>
                  <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* image container side */}
              <div className={`${isLeft ? "md:col-start-2" : "md:col-start-1"} md:row-start-1 flex items-center justify-center`}>
                <div className="h-40 w-40 rounded-2xl bg-neutral-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.company}
                    loading="lazy"
                    className="h-full w-full object-contain rounded-2xl"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </Container>
);

// ---------- PROJECTS ----------
type Project = {
  title: string;
  desc: string;
  href: string;
  img: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Coming soon",
    desc: "........",
    href: "#",
    img: ComingSoonImg,
    tags: ["React", "TypeScript", "RAG", "and much more"],
  },
  {
    title: "Carla-RL Bus",
    desc: "Reinforcement learning experiment in CARLA simulator.",
    href: "https://github.com/adithya22-glitch/Carla-RL",
    img: SelfDrivingBusImg,
    tags: ["Python", "RL", "CARLA"],
  },
  {
    title: "Data Stack Demo",
    desc: "End-to-end ELT → dbt → dashboards on Snowflake.",
    href: "https://github.com/adithya22-glitch/Python_Snowflake_and_DBT",
    img: ESGBankImg,
    tags: ["Snowflake", "dbt", "Airflow"],
  },
];

const Projects = () => (
  <Container id="projects">
    <div className="flex items-center justify-between">
      <Reveal as="h2" className="font-headers text-2xl font-bold tracking-tight">Projects</Reveal>
      <a href="#" className="font-box text-sm underline underline-offset-4">See all</a>
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => {
        const id = `project-${slugify(p.title)}`;
        const card = (
          <div className="group rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
              <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="font-headers font-semibold">{p.title}</div>
              {/* Per-project views (compact) */}
              <ViewCounter id={id} />
            </div>
            <p className="mt-1 text-sm text-neutral-600">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="font-box rounded-full bg-neutral-100 px-2 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
        return p.href && p.href !== "#"
          ? <a key={p.title} href={p.href} target="_blank" rel="noreferrer">{card}</a>
          : <div key={p.title} aria-disabled className="opacity-90 cursor-default">{card}</div>;
      })}
    </div>
  </Container>
);

// ---------- CONTACT ----------
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mandpyaw";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Network error. Please try again.");
    }
  };

  return (
    <Container id="contact">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: intro + buttons */}
        <div>
          <Reveal as="h2" className="font-headers text-2xl font-bold tracking-tight">Let’s talk</Reveal>
          <p className="mt-3 text-neutral-600">
            Open to data/AI roles and collaborations in Berlin (and remote).
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button as="a" href="https://www.linkedin.com/in/adithya-varambally-m/" target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
            <Button as="a" href="https://github.com/adithya22-glitch" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button as="a" href="mailto:Varambally.Adithya@gmail.com" className="bg-black text-white">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button as="a" href={resumePdf} target="_blank" rel="noreferrer" download>
              <ExternalLink className="h-4 w-4" />
              Resume
            </Button>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={onSubmit} className="rounded-2xl border p-6 bg-white">
          <label className="font-headers block text-sm font-medium">Your email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="you@domain.com"
          />

          <label className="font-headers mt-4 block text-sm font-medium">Message</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 h-28 w-full resize-none rounded-xl border p-3"
            placeholder="Hi Adithya, I’d like to…"
          />

          <Button
            as="button"
            type="submit"
            className={`mt-4 w-full ${status === "loading" ? "opacity-70 cursor-not-allowed" : "bg-black text-white"}`}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send"}
          </Button>

          {status === "success" && (
            <p className="mt-3 text-sm text-emerald-600">Thanks! Your message has been sent.</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          <p className="mt-2 text-xs text-neutral-500">
            Messages are delivered to Varambally.Adithya@gmail.com via Formspree.
          </p>
        </form>
      </div>
    </Container>
  );
};

// ---------- FOOTER ----------
const Footer = () => (
  <footer className="border-t py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 md:flex-row md:px-8">
      <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Adithya Varambally</p>
      <div className="flex items-center gap-2">
        <a className="p-2 rounded-xl hover:bg-neutral-100" href="https://github.com/adithya22-glitch" target="_blank" aria-label="GitHub" rel="noreferrer"><Github className="h-5 w-5"/></a>
        <a className="p-2 rounded-xl hover:bg-neutral-100" href="https://www.linkedin.com/in/adithya-varambally-m/" target="_blank" aria-label="LinkedIn" rel="noreferrer"><Linkedin className="h-5 w-5"/></a>
      </div>
    </div>
  </footer>
);

// ---------- APP ----------
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);
  return (
    <div className="relative min-h-svh text-neutral-900">
      <GoldenBackground />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
