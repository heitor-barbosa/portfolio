import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Braces,
  Check,
  CheckCheck,
  CircleDot,
  Code2,
  Copy as CopyIcon,
  Database,
  Download,
  GitBranch,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  MapPin,
  Menu,
  Moon,
  Plus,
  Sparkles,
  Sun,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import { content, profile, type Copy, type Language } from "./content";

const sectionIds = ["sobre", "projetos", "experiencia", "contato"];
const toolbox = [
  {
    label: "Backend",
    items: ["Python", "Django", "Django REST", "Node.js", "Redis", "Pandas"],
  },
  {
    label: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Vite", "WordPress"],
  },
  {
    label: "Data & DevOps",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Docker",
      "GitHub Actions",
      "Linux",
      "Playwright",
    ],
  },
];

function readPreference(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function HeroVisual({ t }: { t: Copy }) {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-top">
        <span>
          <span className="status-dot" /> {t.visualTop}
        </span>
        <Plus size={16} />
      </div>
      <div className="orbital-scene">
        <svg className="orbits" viewBox="0 0 460 400" fill="none">
          <defs>
            <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="currentColor" stopOpacity=".08" />
              <stop offset=".5" stopColor="currentColor" stopOpacity=".6" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".08" />
            </linearGradient>
          </defs>
          <circle
            cx="230"
            cy="200"
            r="155"
            stroke="currentColor"
            strokeOpacity=".1"
            strokeDasharray="2 7"
          />
          <circle
            cx="230"
            cy="200"
            r="115"
            stroke="currentColor"
            strokeOpacity=".08"
          />
          <g className="orbit-spin">
            <ellipse
              cx="230"
              cy="200"
              rx="188"
              ry="69"
              transform="rotate(-32 230 200)"
              stroke="url(#orbit-stroke)"
            />
            <ellipse
              cx="230"
              cy="200"
              rx="188"
              ry="69"
              transform="rotate(32 230 200)"
              stroke="url(#orbit-stroke)"
            />
            <ellipse
              cx="230"
              cy="200"
              rx="188"
              ry="69"
              transform="rotate(90 230 200)"
              stroke="url(#orbit-stroke)"
            />
          </g>
          <circle cx="90" cy="113" r="4" fill="currentColor" />
          <circle cx="367" cy="281" r="4" fill="currentColor" />
          <circle cx="247" cy="354" r="3" fill="currentColor" />
          <path
            d="M224 31h12m-6-6v12M63 279h10m-5-5v10M380 127h10m-5-5v10"
            stroke="currentColor"
            strokeOpacity=".5"
          />
        </svg>
        <div className="core-shadow" />
        <div className="core">
          <span>&lt;</span>
          <span className="core-slash">/</span>
          <span>&gt;</span>
        </div>
        <div className="orbit-tag tag-react">
          <Code2 size={16} />
          <span>React + TypeScript</span>
        </div>
        <div className="orbit-tag tag-python">
          <Database size={16} />
          <span>Python + Django</span>
        </div>
        <div className="orbit-tag tag-ai">
          <Sparkles size={16} />
          <span>AI Agents</span>
        </div>
        <span className="coordinate coord-one">23.5°</span>
        <span className="coordinate coord-two">{"{ ideas: ∞ }"}</span>
      </div>
      <div className="visual-bottom">
        <span>{t.visualBottom}</span>
        <div className="signal">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ index, t }: { index: number; t: Copy }) {
  if (index === 0)
    return (
      <div className="project-art finance-art" aria-hidden="true">
        <div className="finance-window">
          <div className="mini-sidebar">
            <span className="mini-brand">
              o<span>n</span>e.
            </span>
            <Layers3 />
            <Workflow />
            <Database />
            <span className="sidebar-bottom">
              <CircleDot />
            </span>
          </div>
          <div className="finance-main">
            <div className="mini-heading">
              <div>
                <span>{t.dashboard.subtitle}</span>
                <strong>{t.dashboard.title}</strong>
              </div>
              <span className="mini-avatar">HB</span>
            </div>
            <div className="mini-metrics">
              <div>
                <span>{t.dashboard.clients}</span>
                <strong>
                  170 <i>↗</i>
                </strong>
              </div>
              <div>
                <span>{t.dashboard.processing}</span>
                <strong>
                  ~1 <small>min</small>
                </strong>
              </div>
            </div>
            <div className="mini-chart">
              <div>
                {t.dashboard.reconciled}
                <span>
                  <i />
                  {t.dashboard.active}
                </span>
              </div>
              <svg viewBox="0 0 300 65">
                <defs>
                  <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="#bfe880" stopOpacity=".2" />
                    <stop offset="1" stopColor="#bfe880" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 56L22 50L40 54L62 32L80 36L100 24L120 30L143 19L163 26L182 13L201 18L224 9L245 15L267 4L300 7V65H0Z"
                  fill="url(#chart-fill)"
                />
                <path
                  d="M0 56L22 50L40 54L62 32L80 36L100 24L120 30L143 19L163 26L182 13L201 18L224 9L245 15L267 4L300 7"
                  fill="none"
                  stroke="#bfe880"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="mini-flow">
              {[t.dashboard.import, t.dashboard.checked, t.dashboard.done].map(
                (item) => (
                  <span key={item}>
                    <Check size={10} />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
        <span className="art-footnote">FINANCIAL SYSTEM / 01</span>
      </div>
    );
  if (index === 1)
    return (
      <div className="project-art operations-art" aria-hidden="true">
        <div className="workflow-top">
          <span className="workflow-logo">
            <Workflow size={18} />
          </span>
          <span>WORKSPACE / OPERATIONS</span>
          <span className="mini-avatar">HB</span>
        </div>
        <div className="kanban">
          {t.workflow.slice(0, 3).map((column, i) => (
            <div className="kanban-column" key={column}>
              <div className="kanban-title">
                <i />
                {column}
                <Plus size={10} />
              </div>
              {[0, 1, 2].slice(0, i === 1 ? 2 : 3).map((n) => (
                <div className="kanban-card" key={n}>
                  <div className={`card-tag tint-${i}`} />
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                  <div className="kanban-card-bottom">
                    <span>
                      <CheckCheck size={10} /> {n + 1}/3
                    </span>
                    <span className={`tiny-avatar tint-${i}`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="workflow-toast">
          <Check size={14} />
          <span>{t.workflow[3]}</span>
          <span className="toast-line" />
          <span>170</span>
        </div>
        <span className="art-footnote">CONNECTED OPERATIONS / 02</span>
      </div>
    );
  return (
    <div className="project-art ai-art" aria-hidden="true">
      <span className="ai-caption">SPEC-DRIVEN DEVELOPMENT</span>
      <div className="ai-diagram">
        <svg viewBox="0 0 380 230">
          <path d="M190 115L64 52M190 115L316 52M190 115L64 184M190 115L316 184" />
          <circle cx="190" cy="115" r="79" />
          <circle cx="190" cy="115" r="102" strokeDasharray="2 7" />
        </svg>
        <div className="ai-center">
          <Sparkles size={32} />
          <span>AI4SE</span>
        </div>
        {t.ai.map((label, i) => (
          <div key={label} className={`ai-node node-${i}`}>
            <span>0{i + 1}</span>
            {label}
          </div>
        ))}
      </div>
      <span className="art-footnote">HUMAN CURIOSITY × AI / 03</span>
    </div>
  );
}

function ProjectDialog({
  projectIndex,
  onClose,
  t,
}: {
  projectIndex: number | null;
  onClose: () => void;
  t: Copy;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (projectIndex === null) return;
    const dialog = ref.current;
    dialog?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = old;
    };
  }, [projectIndex]);
  const project = projectIndex === null ? null : t.projects[projectIndex];
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      {project && (
        <div className="dialog-inner">
          <div className="dialog-top">
            <span className="eyebrow">{project.company}</span>
            <button
              autoFocus
              className="icon-button"
              onClick={onClose}
              aria-label={t.close}
            >
              <X size={22} />
            </button>
          </div>
          <span className="project-category">{project.category}</span>
          <h2 id="dialog-title">{project.title}</h2>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h3 className="eyebrow">{t.detailHeading}</h3>
          <p>{project.detail}</p>
          <h3 className="eyebrow">{t.resultsHeading}</h3>
          <ul className="result-list">
            {project.results.map((result) => (
              <li key={result}>
                <ArrowUpRight size={18} />
                <span>{result}</span>
              </li>
            ))}
          </ul>
          <div className="dialog-footer">
            <span>
              {projectIndex === 2 ? project.metricLabel : t.projectPrivate}
            </span>
            <a href={`mailto:${profile.email}`} className="text-link">
              {t.emailCta}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}

function GitHubActivity({ t }: { t: Copy }) {
  // Replace this intentionally empty placeholder with a verified contributions provider.
  // Never expose a GitHub access token in client-side code.
  return (
    <aside className="github-inline-block" aria-labelledby="github-heading">
      <div className="container github-inline-layout">
        <div className="github-inline-copy">
          <span className="eyebrow">
            <Github size={14} /> GITHUB / @heitor-barbosa
          </span>
          <h2 id="github-heading">{t.githubTitle}</h2>
          <p className="section-description">{t.githubText}</p>
          <a
            className="button button-secondary github-link"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            {t.githubCta}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="github-panel github-panel-inline">
          <div className="github-panel-top">
            <span>
              <Github size={20} />
              <strong>heitor-barbosa</strong>
              <span className="muted">/ {t.githubContributions}</span>
            </span>
            <span className="integration-label">
              <span className="status-dot" />
              {t.githubBadge}
            </span>
          </div>
          <div className="contribution-placeholder">
            <div className="contribution-grid" aria-hidden="true">
              {Array.from({ length: 364 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <div className="contribution-message">
              <GitBranch size={24} />
              <h3>{t.githubReserved}</h3>
              <p>{t.githubPlaceholder}</p>
            </div>
          </div>
          <div className="github-panel-bottom">
            <span>{t.githubNote}</span>
            <span className="empty-legend" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>(() =>
    readPreference("heitor-language", "pt") === "en" ? "en" : "pt",
  );
  const [theme, setTheme] = useState(() =>
    readPreference("heitor-theme", "dark") === "light" ? "light" : "dark",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [projectIndex, setProjectIndex] = useState<number | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const t = content[lang];
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title =
      lang === "pt"
        ? "Heitor Barbosa — Engenheiro de Software"
        : "Heitor Barbosa — Software Engineer";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.intro);
    try {
      localStorage.setItem("heitor-language", lang);
    } catch {
      /* Storage can be disabled. */
    }
  }, [lang, t.intro]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#111310" : "#f5f5ef");
    try {
      localStorage.setItem("heitor-theme", theme);
    } catch {
      /* Keep in-memory preference. */
    }
  }, [theme]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (copyState === "idle") return;
    const id = window.setTimeout(() => setCopyState("idle"), 3500);
    return () => window.clearTimeout(id);
  }, [copyState]);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <div className="header-inner">
          <a
            href="#inicio"
            className="wordmark"
            aria-label={`Heitor Barbosa — ${lang === "pt" ? "início" : "home"}`}
          >
            heitor<span>.</span>
          </a>
          <nav
            className={`nav ${menuOpen ? "is-open" : ""}`}
            id="main-nav"
            aria-label={
              lang === "pt" ? "Navegação principal" : "Main navigation"
            }
          >
            {sectionIds.map((id, i) => (
              <a
                href={`#${id}`}
                key={id}
                className={activeSection === id ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[i]}
              </a>
            ))}
          </nav>
          <div className="header-controls">
            <div
              className="language-switch"
              role="group"
              aria-label={lang === "pt" ? "Idioma" : "Language"}
            >
              <button
                lang="pt-BR"
                aria-label="Português brasileiro"
                aria-pressed={lang === "pt"}
                onClick={() => setLang("pt")}
              >
                PT
              </button>
              <span>/</span>
              <button
                lang="en"
                aria-label="English"
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
            <span className="control-divider" />
            <button
              className="icon-button theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? t.theme : t.themeDark}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a href={`mailto:${profile.email}`} className="header-contact">
              {t.nav[3]}
              <ArrowUpRight size={15} />
            </a>
            <button
              className="icon-button mobile-menu"
              aria-label={menuOpen ? t.closeMenu : t.menu}
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section
          className="hero container"
          id="inicio"
          aria-labelledby="hero-heading"
        >
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              {t.eyebrow}
            </span>
            <p className="hello">
              {t.hello}
              <span className="hello-line" />
            </p>
            <h1 id="hero-heading">
              {t.title[0]}
              <br />
              {t.title[1]}
              <br />
              <span>{t.title[2]}</span>
            </h1>
            <p className="hero-description">{t.intro}</p>
            <div className="hero-actions">
              <a href="#projetos" className="button button-primary">
                {t.projectsCta}
                <ArrowUpRight size={19} />
              </a>
              <a
                href={profile.resume}
                className="resume-link"
                download
                title={t.resumeLang}
              >
                {t.resume}
                <Download size={16} />
              </a>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={14} />
                {t.location}
              </span>
              <span className="meta-dot">·</span>
              <span>Full stack & AI</span>
              <div className="hero-socials">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={17} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>
          <HeroVisual t={t} />
          <div className="hero-bottom">
            <span>PYTHON / TYPESCRIPT / REACT / AI</span>
            <a href="#sobre">
              {t.scroll}
              <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <GitHubActivity t={t} />
        <div className="container">
          <section
            className="section about-section"
            id="sobre"
            aria-labelledby="about-heading"
          >
            <div className="about-main">
              <span className="eyebrow">{t.aboutLabel}</span>
              <h2 id="about-heading">
                {t.aboutTitle}
                <br />
                <span className="muted-heading">{t.aboutAccent}</span>
              </h2>
              <p className="about-lead">{t.aboutText}</p>
              <p className="body-copy">{t.aboutBody}</p>
              <div className="education">
                <GraduationCap size={22} />
                <div>
                  <strong>{t.education}</strong>
                  <span>
                    {t.university}{" "}
                    <span className="education-date">· {t.educationDate}</span>
                  </span>
                </div>
                <ArrowUpRight size={17} />
              </div>
              <span className="language-note">{t.languages}</span>
            </div>
            <div className="toolbox">
              <div className="toolbox-title">
                <Terminal size={18} />
                <span className="eyebrow">{t.stackLabel}</span>
                <span className="toolbox-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              {toolbox.map((group, i) => (
                <div className="toolbox-group" key={group.label}>
                  <span className="toolbox-index">0{i + 1}</span>
                  <div>
                    <h3>{group.label}</h3>
                    <div className="tags">
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="toolbox-bottom">
                <Braces size={15} />
                <span>
                  always_learning: <strong>true</strong>
                </span>
              </div>
            </div>
          </section>
          <section
            className="section projects-section"
            id="projetos"
            aria-labelledby="projects-heading"
          >
            <div className="section-heading">
              <div>
                <span className="eyebrow">{t.projectLabel}</span>
                <h2 id="projects-heading">
                  {t.projectTitle}
                  <br />
                  <span className="muted-heading">{t.projectAccent}</span>
                </h2>
              </div>
              <p className="section-side-note">
                {t.projectIntro}
                <ArrowDownRight size={23} />
              </p>
            </div>
            <div className="project-grid">
              {t.projects.map((project, i) => (
                <article className="project-card" key={i}>
                  <button
                    className="project-art-button"
                    onClick={() => setProjectIndex(i)}
                    aria-label={`${t.projectMore}: ${project.title}`}
                  >
                    <ProjectVisual index={i} t={t} />
                    <span className="project-open">
                      <ArrowUpRight size={21} />
                    </span>
                  </button>
                  <div className="project-copy">
                    <div className="project-category">
                      <span>{project.category}</span>
                      <span>0{i + 1}</span>
                    </div>
                    <h3>
                      <button onClick={() => setProjectIndex(i)}>
                        {project.title}
                      </button>
                    </h3>
                    <p>{project.description}</p>
                    <div className="tags project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-card-bottom">
                      <span>
                        <strong>{project.metric}</strong> {project.metricLabel}
                      </span>
                      <button
                        onClick={() => setProjectIndex(i)}
                        aria-label={`${t.projectMore}: ${project.title}`}
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="project-illustration-note">
              {t.concept} · {t.projectPrivate}
            </p>
          </section>
          <section
            className="section experience-section"
            id="experiencia"
            aria-labelledby="experience-heading"
          >
            <div className="experience-heading">
              <span className="eyebrow">{t.experienceLabel}</span>
              <h2 id="experience-heading">
                {t.experienceTitle}
                <br />
                <span className="muted-heading">{t.experienceAccent}</span>
              </h2>
              <p className="section-description">{t.experienceIntro}</p>
              <span className="experience-symbol" aria-hidden="true">
                ↳
              </span>
            </div>
            <div className="timeline">
              {t.jobs.map((job, i) => (
                <article className="timeline-item" key={job.company}>
                  <div
                    className={`timeline-dot ${job.current ? "current" : ""}`}
                  />
                  <div className="timeline-meta">
                    <span>{job.date}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <h3>{job.company}</h3>
                  <h4>{job.role}</h4>
                  <p>{job.text}</p>
                  {i === 0 && (
                    <span className="research-tag">
                      <Sparkles size={12} /> AI × SOFTWARE ENGINEERING
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>
          <section
            className="section contact-section"
            id="contato"
            aria-labelledby="contact-heading"
          >
            <span className="eyebrow">
              <span className="status-dot" />
              {t.contactLabel}
            </span>
            <div className="contact-main">
              <div>
                <h2 id="contact-heading">
                  {t.contactTitle}
                  <br />
                  <span>{t.contactAccent}</span>
                </h2>
                <p>{t.contactText}</p>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="contact-arrow"
                aria-label={t.emailCta}
              >
                <ArrowUpRight strokeWidth={1} />
              </a>
            </div>
            <div className="contact-bottom">
              <div className="email-group">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button
                  className="icon-button"
                  onClick={copyEmail}
                  aria-label={t.copy}
                >
                  {copyState === "success" ? (
                    <Check size={18} />
                  ) : (
                    <CopyIcon size={18} />
                  )}
                </button>
                <span
                  role="status"
                  className={`copy-status ${copyState !== "idle" ? "visible" : ""}`}
                >
                  {copyState === "success"
                    ? t.copied
                    : copyState === "error"
                      ? t.copyFailed
                      : ""}
                </span>
              </div>
              <div className="contact-socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                  <ArrowUpRight size={15} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                  <ArrowUpRight size={15} />
                </a>
                <a href={profile.resume} download title={t.resumeLang}>
                  {t.resume}
                  <Download size={15} />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a href="#inicio" className="wordmark">
          heitor<span>.</span>
        </a>
        <span>
          © {new Date().getFullYear()} Heitor Barbosa{" "}
          <span className="footer-dot">·</span>{" "}
          <span className="footer-note">{t.footer}</span>
        </span>
        <a href="#inicio" className="back-top">
          {t.backTop}
          <ArrowUp size={15} />
        </a>
      </footer>
      <ProjectDialog
        projectIndex={projectIndex}
        onClose={() => setProjectIndex(null)}
        t={t}
      />
    </>
  );
}
