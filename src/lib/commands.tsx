import React from "react";
import { getContent, skills, socialLinks, type Lang } from "@/data/content";
import { ASCII_PANDA } from "./ascii";

export interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const HelpOutput = ({ onCommandClick }: { onCommandClick?: (cmd: string) => void }) => {
  const commands = [
    { cmd: "whoami", desc: "who is Panda Tseng" },
    { cmd: "cat soul.md", desc: "about me, values, highlights" },
    { cmd: "cat experience.json", desc: "work experience" },
    { cmd: "ls projects/", desc: "side projects & initiatives" },
    { cmd: "cat achievements.md", desc: "competition awards" },
    { cmd: "cat contact.json", desc: "reach me" },
    { cmd: "cat education.md", desc: "academic background" },
    { cmd: "cat skills.md", desc: "skill set & proficiency" },
    { cmd: "clear", desc: "clear terminal" },
    { cmd: "help", desc: "show this message" },
  ];

  return (
    <div className="space-y-3">
      <p className="text-accent-purple font-bold">Available commands:</p>
      <div className="space-y-1">
        {commands.map(({ cmd, desc }) => (
          <div key={cmd} className="flex gap-2">
            <button
              onClick={() => onCommandClick?.(cmd)}
              className="text-left text-accent-cyan hover:underline cursor-pointer shrink-0 min-w-[180px]"
            >
              {cmd}
            </button>
            <span className="text-text-secondary">&mdash; {desc}</span>
          </div>
        ))}
      </div>
      <p className="text-text-muted text-xs mt-2">
        Tab: autocomplete  |  &uarr;&darr;: history  |  Click any command to run it
      </p>
    </div>
  );
};

const WhoamiOutput = ({ lang }: { lang: Lang }) => {
  const { personalInfo } = getContent(lang);
  return (
    <div className="space-y-1">
      <pre className="text-accent-green text-[10px] sm:text-xs leading-tight">{ASCII_PANDA}</pre>
      <p className="text-xl font-bold text-text-primary">{personalInfo.name}</p>
      <p className="text-accent-purple">{personalInfo.title}</p>
      <p className="text-text-secondary">{personalInfo.tagline}</p>
      <p className="text-text-secondary text-sm">
        <span className="text-accent-yellow">location:</span> {personalInfo.location}
      </p>
    </div>
  );
};

const SoulOutput = ({ lang }: { lang: Lang }) => {
  const { about } = getContent(lang);
  return (
    <div className="space-y-4">
      <p className="text-accent-purple font-bold"># {about.headline}</p>
      {about.description.map((p: string, i: number) => (
        <p key={i} className="text-text-primary leading-relaxed">{p}</p>
      ))}
      <div className="space-y-2 mt-4">
        <p className="text-accent-purple font-bold">## Highlights</p>
        {about.highlights.map((h: string, i: number) => (
          <p key={i} className="text-text-primary">
            <span className="text-accent-yellow">-</span> {h}
          </p>
        ))}
      </div>
    </div>
  );
};

const ExperienceOutput = ({ lang }: { lang: Lang }) => {
  const { experiences } = getContent(lang);
  return (
    <div className="space-y-2">
      {experiences.map((exp, index: number) => (
        <div key={index}>
          {index > 0 && (
            <div className="border-t border-terminal-border/30 my-5" />
          )}
          <div className="space-y-0.5">
          <p className="text-text-muted">{"{"}</p>
          <div className="ml-4 space-y-0.5">
            <p><span className="text-accent-cyan">&quot;company&quot;</span><span className="text-text-secondary">: </span><span className="text-accent-green">&quot;{exp.company}&quot;</span><span className="text-text-secondary">,</span></p>
            <p><span className="text-accent-cyan">&quot;role&quot;</span><span className="text-text-secondary">: </span><span className="text-accent-green">&quot;{exp.position}&quot;</span><span className="text-text-secondary">,</span></p>
            <p><span className="text-accent-cyan">&quot;period&quot;</span><span className="text-text-secondary">: </span><span className="text-accent-orange">&quot;{exp.period}&quot;</span><span className="text-text-secondary">,</span></p>
            <p><span className="text-accent-cyan">&quot;location&quot;</span><span className="text-text-secondary">: </span><span className="text-accent-green">&quot;{exp.location}&quot;</span><span className="text-text-secondary">,</span></p>
            <p><span className="text-accent-cyan">&quot;achievements&quot;</span><span className="text-text-secondary">: [</span></p>
            <div className="ml-4">
              {exp.achievements.map((a: string, i: number) => (
                <p key={i}><span className="text-accent-green">&quot;{a}&quot;</span>{i < exp.achievements.length - 1 && <span className="text-text-secondary">,</span>}</p>
              ))}
            </div>
            <p className="text-text-secondary">],</p>
            <p><span className="text-accent-cyan">&quot;tags&quot;</span><span className="text-text-secondary">: [</span>{exp.tags.map((t: string, i: number) => (<span key={i}><span className="text-accent-yellow">&quot;{t}&quot;</span>{i < exp.tags.length - 1 && <span className="text-text-secondary">, </span>}</span>))}<span className="text-text-secondary">]</span></p>
          </div>
          <p className="text-text-muted">{"}"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectsOutput = ({ lang }: { lang: Lang }) => {
  const { projects } = getContent(lang);
  return (
    <div className="space-y-4">
      <p className="text-text-secondary text-sm">total {projects.length}</p>
      {projects.map((project, index: number) => (
        <div key={index}>
          {index > 0 && (
            <div className="border-t border-terminal-border/30 my-5" />
          )}
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-accent-green">drwxr-xr-x</span>
              <span className="text-text-secondary">  panda  </span>
              <span className="text-accent-cyan font-bold">{project.name}/</span>
            </p>
            <div className="ml-4">
              <p className="text-text-primary mb-2">{project.description}</p>
              {project.highlights.map((h: string, i: number) => (
                <p key={i} className="text-text-secondary text-sm"><span className="text-accent-green">+</span> {h}</p>
              ))}
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="terminal-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AchievementsOutput = ({ lang }: { lang: Lang }) => {
  const { achievements } = getContent(lang);
  return (
    <div className="space-y-8">
      {achievements.map((category, ci: number) => (
        <div key={ci} className="space-y-3">
          <p className="text-accent-purple font-bold">## {category.category}</p>
          <div className="space-y-3">
            {category.awards.map((award, ai: number) => (
              <div key={ai} className="space-y-0.5">
                <p>
                  <span className="text-accent-yellow font-bold">{award.title}</span>
                  <span className="text-text-muted"> — </span>
                  {"link" in award && typeof award.link === "string" && award.link ? (
                    <a href={award.link as string} target="_blank" rel="noopener noreferrer" className="terminal-link">{award.competition}</a>
                  ) : (
                    <span className="text-text-primary">{award.competition}</span>
                  )}
                </p>
                <p className="text-sm">
                  <span className="text-accent-orange">{award.year}</span>
                  <span className="text-text-muted"> · </span>
                  <span className="text-text-secondary">{award.location}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ContactOutput = () => {
  const links = [
    { key: "email", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
    { key: "github", value: "github.com/a0981456759", href: socialLinks.github },
  ];

  return (
    <div>
      <p className="text-text-muted">{"{"}</p>
      <div className="space-y-0.5 my-1 ml-6">
        {links.map((link, i) => (
          <p key={link.key}>
            <span className="text-accent-cyan">&quot;{link.key}&quot;</span>
            <span className="text-text-secondary">: </span>
            <a
              href={link.href}
              target={link.key === "email" ? undefined : "_blank"}
              rel={link.key === "email" ? undefined : "noopener noreferrer"}
              className="text-accent-green hover:underline"
            >
              &quot;{link.value}&quot;
            </a>
            {i < links.length - 1 && <span className="text-text-secondary">,</span>}
          </p>
        ))}
      </div>
      <p className="text-text-muted">{"}"}</p>
    </div>
  );
};

const EducationOutput = ({ lang }: { lang: Lang }) => {
  const { education } = getContent(lang);
  return (
    <div className="space-y-4">
      <p className="text-accent-purple font-bold"># Education</p>
      {education.map((edu, i: number) => (
        <div key={i} className="space-y-1 ml-2">
          <p className="text-text-primary font-bold">{edu.school}</p>
          <p className="text-accent-cyan">{edu.degree} &mdash; {edu.major}</p>
          <p className="text-text-secondary text-sm">{edu.period} | {edu.location}</p>
        </div>
      ))}
    </div>
  );
};

const SkillsOutput = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px" }}>
    {skills.map((category, i: number) => (
      <div key={i} className="space-y-1">
        <p className="text-accent-purple font-bold">{category.category}:</p>
        {category.items.map((item, j: number) => (
          <p key={j} className="ml-2">
            <span className="text-accent-cyan">-</span>{" "}
            <span className="text-text-primary">{item.name}</span>
          </p>
        ))}
      </div>
    ))}
  </div>
);

const HireOutput = () => (
  <div className="space-y-2">
    <p className="text-accent-green font-bold">Permission granted.</p>
    <p className="text-text-primary">Panda is available for:</p>
    <p className="text-text-primary"><span className="text-accent-yellow">-</span> Web3 product & operations roles</p>
    <p className="text-text-primary"><span className="text-accent-yellow">-</span> Content collaboration & partnerships</p>
    <p className="text-text-primary"><span className="text-accent-yellow">-</span> Blockchain consulting</p>
    <p className="text-text-primary mt-2">
      <span className="text-accent-cyan">&rarr;</span> Reach out: <a href="mailto:m10705506@gmail.com" className="terminal-link">m10705506@gmail.com</a>
    </p>
  </div>
);

const COMMANDS: Record<string, string[]> = {
  "help": [],
  "whoami": [],
  "cat soul.md": [],
  "cat experience.json": [],
  "ls projects/": [],
  "cat achievements.md": [],
  "cat contact.json": [],
  "cat education.md": [],
  "cat skills.md": [],
  "clear": [],
};

export function getCommandNames(): string[] {
  return Object.keys(COMMANDS);
}

export function executeCommand(
  input: string,
  onCommandClick?: (cmd: string) => void,
  lang: Lang = "en"
): CommandOutput | null {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") return null;
  if (trimmed === "clear") return { command: input, output: null };

  const outputMap: Record<string, () => React.ReactNode> = {
    "help": () => <HelpOutput onCommandClick={onCommandClick} />,
    "whoami": () => <WhoamiOutput lang={lang} />,
    "cat soul.md": () => <SoulOutput lang={lang} />,
    "cat experience.json": () => <ExperienceOutput lang={lang} />,
    "ls projects/": () => <ProjectsOutput lang={lang} />,
    "ls projects": () => <ProjectsOutput lang={lang} />,
    "cat achievements.md": () => <AchievementsOutput lang={lang} />,
    "cat contact.json": () => <ContactOutput />,
    "cat education.md": () => <EducationOutput lang={lang} />,
    "cat skills.md": () => <SkillsOutput />,
    "sudo hire-panda": () => <HireOutput />,
  };

  const factory = outputMap[trimmed];
  if (factory) {
    return { command: input, output: factory() };
  }

  return {
    command: input,
    output: (
      <p className="text-accent-red">
        zsh: command not found: {input.split(" ")[0]}
        <span className="text-text-secondary block mt-1">
          Type{" "}
          <button
            onClick={() => onCommandClick?.("help")}
            className="text-accent-cyan hover:underline cursor-pointer"
          >
            help
          </button>{" "}
          for available commands
        </span>
      </p>
    ),
  };
}
