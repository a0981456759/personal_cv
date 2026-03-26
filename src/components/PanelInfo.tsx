"use client";

import { getContent, socialLinks, type Lang } from "@/data/content";

const PanelInfo = ({ lang }: { lang: Lang }) => {
  const { personalInfo } = getContent(lang);
  return (
    <div className="px-4 py-2 font-mono text-xs flex items-center justify-between gap-4 overflow-x-auto">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-text-primary font-bold">{personalInfo.name}</span>
        <span className="text-text-muted">|</span>
        <span className="text-accent-purple">{personalInfo.title}</span>
        <span className="text-text-muted">|</span>
        <span className="text-accent-yellow">{personalInfo.location}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0 text-text-secondary">
        <a href={`mailto:${socialLinks.email}`} className="hover:text-accent-cyan transition-colors">
          mail
        </a>
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">
          gh
        </a>
        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">
          x
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent-cyan transition-colors">
          in
        </a>
      </div>
    </div>
  );
};

export default PanelInfo;
