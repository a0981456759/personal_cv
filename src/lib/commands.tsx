import React from "react";
import { personalInfo, about, experiences, projects, achievements, socialLinks, education } from "@/data/content";
import { ASCII_PANDA } from "./ascii";

export interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const HelpOutput = () => (
  <div className="space-y-1">
    <p className="text-accent-purple font-bold">Available commands:</p>
    <p><span className="text-accent-cyan">whoami</span>          <span className="text-text-secondary">— who is Panda Tseng</span></p>
    <p><span className="text-accent-cyan">cat soul.md</span>     <span className="text-text-secondary">— about me, values, highlights</span></p>
    <p><span className="text-accent-cyan">cat experience.json</span> <span className="text-text-secondary">— work experience</span></p>
    <p><span className="text-accent-cyan">ls projects/</span>    <span className="text-text-secondary">— side projects &amp; initiatives</span></p>
    <p><span className="text-accent-cyan">cat achievements.md</span> <span className="text-text-secondary">— competition awards</span></p>
    <p><span className="text-accent-cyan">cat contact.json</span> <span className="text-text-secondary">— reach me</span></p>
    <p><span className="text-accent-cyan">cat education.md</span> <span className="text-text-secondary">— academic background</span></p>
    <p><span className="text-accent-cyan">clear</span>           <span className="text-text-secondary">— clear terminal</span></p>
    <p><span className="text-accent-cyan">help</span>            <span className="text-text-secondary">— show this message</span></p>
    <p className="text-text-muted mt-2">Tip: press Tab to autocomplete, Up/Down for history</p>
  </div>
);

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
  <div className="space-y-3">
    <p className="text-accent-purple font-bold"># {about.headline}</p>
    {about.description.map((p, i) => (
      <p key={i} className="text-text-primary leading-relaxed">{p}</p>
    ))}
    <div className="space-y-1 mt-2">
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
  <div className="space-y-4">
    {experiences.map((exp, index) => (
      <div key={index} className="space-y-0.5">
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
    ))}
  </div>
);

const ProjectsOutput = () => (
  <div className="space-y-4">
    <p className="text-text-secondary text-sm">total {projects.length}</p>
    {projects.map((project, index) => (
      <div key={index} className="space-y-2">
        <p className="text-sm">
          <span className="text-accent-green">drwxr-xr-x</span>
          <span className="text-text-secondary">  panda  </span>
          <span className="text-accent-cyan font-bold">{project.name}/</span>
        </p>
        <div className="ml-4 p-3 bg-terminal-bg-alt rounded border border-terminal-border">
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
    ))}
  </div>
);

const AchievementsOutput = () => (
  <div className="space-y-4">
    {achievements.map((category, ci) => (
      <div key={ci} className="space-y-2">
        <p className="text-accent-purple font-bold">## {category.category}</p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="text-text-secondary border-b border-terminal-border">
                <th className="text-left pr-4 py-1 font-normal">TITLE</th>
                <th className="text-left pr-4 py-1 font-normal">COMPETITION</th>
                <th className="text-left pr-4 py-1 font-normal">YEAR</th>
                <th className="text-left py-1 font-normal">LOCATION</th>
              </tr>
            </thead>
            <tbody>
              {category.awards.map((award, ai) => (
                <tr key={ai} className="border-b border-terminal-border/30">
                  <td className="pr-4 py-1.5 text-accent-yellow font-bold whitespace-nowrap">{award.title}</td>
                  <td className="pr-4 py-1.5 text-text-primary">
                    {"link" in award && award.link ? (
                      <a href={award.link} target="_blank" rel="noopener noreferrer" className="terminal-link">{award.competition}</a>
                    ) : award.competition}
                  </td>
                  <td className="pr-4 py-1.5 text-accent-orange whitespace-nowrap">{award.year}</td>
                  <td className="py-1.5 text-text-secondary whitespace-nowrap">{award.location}</td>
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
    { key: "email", value: socialLinks.email },
    { key: "telegram", value: "t.me/FinalFantasty" },
    { key: "twitter", value: "x.com/pandazeng1" },
    { key: "linkedin", value: "linkedin.com/in/wei-chieh-tseng" },
    { key: "github", value: "github.com/panda850819" },
    { key: "medium", value: "medium.com/@kiss851990" },
    { key: "blog", value: "blog.pdzeng.com" },
  ];

  return (
    <div>
      <p className="text-text-muted">{"{"}</p>
      <div className="ml-4 space-y-0.5">
        {links.map((link, i) => (
          <p key={link.key}>
            <span className="text-accent-cyan">&quot;{link.key}&quot;</span>
            <span className="text-text-secondary">: </span>
            <span className="text-accent-green">&quot;{link.value}&quot;</span>
            {i < links.length - 1 && <span className="text-text-secondary">,</span>}
          </p>
        ))}
      </div>
      <p className="text-text-muted">{"}"}</p>
    </div>
  );
};

const EducationOutput = () => (
  <div className="space-y-3">
    <p className="text-accent-purple font-bold"># Education</p>
    {education.map((edu, i) => (
      <div key={i} className="space-y-0.5 ml-2">
        <p className="text-text-primary font-bold">{edu.school}</p>
        <p className="text-accent-cyan">{edu.degree} — {edu.major}</p>
        <p className="text-text-secondary text-sm">{edu.period} | {edu.location}</p>
      </div>
    ))}
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
  "clear": [],
};

export function getCommandNames(): string[] {
  return Object.keys(COMMANDS);
}

export function executeCommand(input: string): CommandOutput | null {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === "") return null;
  if (trimmed === "clear") return { command: input, output: null };

  const outputMap: Record<string, React.ReactNode> = {
    "help": <HelpOutput />,
    "whoami": <WhoamiOutput />,
    "cat soul.md": <SoulOutput />,
    "cat experience.json": <ExperienceOutput />,
    "ls projects/": <ProjectsOutput />,
    "ls projects": <ProjectsOutput />,
    "cat achievements.md": <AchievementsOutput />,
    "cat contact.json": <ContactOutput />,
    "cat education.md": <EducationOutput />,
  };

  const output = outputMap[trimmed];
  if (output !== undefined) {
    return { command: input, output };
  }

  return {
    command: input,
    output: (
      <p className="text-accent-red">
        zsh: command not found: {input.split(" ")[0]}
        <span className="text-text-secondary block mt-1">Type <span className="text-accent-cyan">help</span> for available commands</span>
      </p>
    ),
  };
}
