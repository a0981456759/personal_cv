import React from "react";
import { personalInfo, about, experiences, projects, achievements, socialLinks, education, skills } from "@/data/content";
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

const WhoamiOutput = () => (
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

const SoulOutput = () => (
  <div className="space-y-4">
    <p className="text-accent-purple font-bold"># {about.headline}</p>
    {about.description.map((p, i) => (
      <p key={i} className="text-text-primary leading-relaxed">{p}</p>
    ))}
    <div className="space-y-2 mt-4">
      <p className="text-accent-purple font-bold">## Highlights</p>
      {about.highlights.map((h, i) => (
        <p key={i} className="text-text-primary">
          <span className="text-accent-yellow">-</span> {h}
        </p>
      ))}
    </div>
  </div>
);

const ExperienceOutput = () => (
  <div className="space-y-2">
    {experiences.map((exp, index) => (
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
            {exp.achievements.map((a, i) => (
              <p key={i}><span className="text-accent-green">&quot;{a}&quot;</span>{i < exp.achievements.length - 1 && <span className="text-text-secondary">,</span>}</p>
            ))}
          </div>
          <p className="text-text-secondary">],</p>
          <p><span className="text-accent-cyan">&quot;tags&quot;</span><span className="text-text-secondary">: [</span>{exp.tags.map((t, i) => (<span key={i}><span className="text-accent-yellow">&quot;{t}&quot;</span>{i < exp.tags.length - 1 && <span className="text-text-secondary">, </span>}</span>))}<span className="text-text-secondary">]</span></p>
        </div>
        <p className="text-text-muted">{"}"}</p>
        </div>
      </div>
    ))}
  </div>
);

const ProjectsOutput = () => (
  <div className="space-y-4">
    <p className="text-text-secondary text-sm">total {projects.length}</p>
    {projects.map((project, index) => (
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
            {project.highlights.map((h, i) => (
              <p key={i} className="text-text-secondary text-sm"><span className="text-accent-green">+</span> {h}</p>
            ))}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="terminal-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AchievementsOutput = () => (
  <div className="space-y-8">
    {achievements.map((category, ci) => (
      <div key={ci} className="space-y-3">
        <p className="text-accent-purple font-bold">## {category.category}</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="text-text-secondary border-b border-terminal-border">
                <th className="text-left pr-4 py-1.5 font-normal">TITLE</th>
                <th className="text-left pr-4 py-1.5 font-normal">COMPETITION</th>
                <th className="text-left pr-4 py-1.5 font-normal">YEAR</th>
                <th className="text-left py-1.5 font-normal">LOCATION</th>
              </tr>
            </thead>
            <tbody>
              {category.awards.map((award, ai) => (
                <tr key={ai} className="border-b border-terminal-border/30">
                  <td className="pr-4 py-2 text-accent-yellow font-bold whitespace-nowrap">{award.title}</td>
                  <td className="pr-4 py-2 text-text-primary">
                    {"link" in award && award.link ? (
                      <a href={award.link} target="_blank" rel="noopener noreferrer" className="terminal-link">{award.competition}</a>
                    ) : award.competition}
                  </td>
                  <td className="pr-4 py-2 text-accent-orange whitespace-nowrap">{award.year}</td>
                  <td className="py-2 text-text-secondary whitespace-nowrap">{award.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ))}
  </div>
);

const ContactOutput = () => {
  const links = [
    { key: "email", value: socialLinks.email, href: `mailto:${socialLinks.email}` },
    { key: "telegram", value: "t.me/FinalFantasty", href: socialLinks.telegram },
    { key: "twitter", value: "x.com/pandazeng1", href: socialLinks.twitter },
    { key: "linkedin", value: "linkedin.com/in/wei-chieh-tseng", href: socialLinks.linkedin },
    { key: "github", value: "github.com/panda850819", href: socialLinks.github },
    { key: "medium", value: "medium.com/@kiss851990", href: socialLinks.medium },
    { key: "blog", value: "blog.pdzeng.com", href: socialLinks.blog },
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

const EducationOutput = () => (
  <div className="space-y-4">
    <p className="text-accent-purple font-bold"># Education</p>
    {education.map((edu, i) => (
      <div key={i} className="space-y-1 ml-2">
        <p className="text-text-primary font-bold">{edu.school}</p>
        <p className="text-accent-cyan">{edu.degree} &mdash; {edu.major}</p>
        <p className="text-text-secondary text-sm">{edu.period} | {edu.location}</p>
      </div>
    ))}
  </div>
);

const SkillsOutput = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 32px" }}>
    {skills.map((category, i) => (
      <div key={i} className="space-y-1">
        <p className="text-accent-purple font-bold">{category.category}:</p>
        {category.items.map((item, j) => (
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
      <span className="text-accent-cyan">&rarr;</span> Reach out: <a href="mailto:panda@walkincat.org" className="terminal-link">panda@walkincat.org</a>
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
  onCommandClick?: (cmd: string) => void
): CommandOutput | null {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") return null;
  if (trimmed === "clear") return { command: input, output: null };

  const outputMap: Record<string, () => React.ReactNode> = {
    "help": () => <HelpOutput onCommandClick={onCommandClick} />,
    "whoami": () => <WhoamiOutput />,
    "cat soul.md": () => <SoulOutput />,
    "cat experience.json": () => <ExperienceOutput />,
    "ls projects/": () => <ProjectsOutput />,
    "ls projects": () => <ProjectsOutput />,
    "cat achievements.md": () => <AchievementsOutput />,
    "cat contact.json": () => <ContactOutput />,
    "cat education.md": () => <EducationOutput />,
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
