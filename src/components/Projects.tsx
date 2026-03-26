"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { projects } from "@/data/content";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="projects" ref={ref} className="mb-12">
      <TerminalPrompt command="ls -la projects/" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-6"
        >
          {/* ls header */}
          <p className="text-text-secondary text-sm">
            total {projects.length}
          </p>

          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              {/* File listing line */}
              <p className="text-sm">
                <span className="text-accent-green">drwxr-xr-x</span>
                <span className="text-text-secondary">  panda  </span>
                <span className="text-accent-cyan font-bold">
                  {project.name}/
                </span>
              </p>

              {/* Project details as cat output */}
              <div className="ml-4 p-4 bg-terminal-bg-alt rounded border border-terminal-border">
                <p className="text-text-primary mb-2">{project.description}</p>

                {project.highlights.map((h, i) => (
                  <p key={i} className="text-text-secondary text-sm">
                    <span className="text-accent-green">+</span> {h}
                  </p>
                ))}

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="terminal-tag">{tag}</span>
                  ))}
                </div>

                {project.link && project.link !== "#" && (
                  <p className="mt-2 text-sm">
                    <span className="text-accent-yellow">url:</span>{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-link"
                    >
                      {project.link}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
