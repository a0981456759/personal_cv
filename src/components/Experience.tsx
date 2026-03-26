"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { experiences } from "@/data/content";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="experience" ref={ref} className="mb-12">
      <TerminalPrompt command='cat experience.json | jq ".[]"' />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-6"
        >
          {experiences.map((exp, index) => (
            <div key={index} className="space-y-1">
              <p className="text-text-muted">{"{"}</p>
              <div className="ml-4 space-y-0.5">
                <p>
                  <span className="text-accent-cyan">&quot;company&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-green">&quot;{exp.company}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;role&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-green">&quot;{exp.position}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;period&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-orange">&quot;{exp.period}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;location&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-accent-green">&quot;{exp.location}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;description&quot;</span>
                  <span className="text-text-secondary">: </span>
                  <span className="text-text-primary">&quot;{exp.description}&quot;</span>
                  <span className="text-text-secondary">,</span>
                </p>
                <p>
                  <span className="text-accent-cyan">&quot;achievements&quot;</span>
                  <span className="text-text-secondary">: [</span>
                </p>
                <div className="ml-4">
                  {exp.achievements.map((a, i) => (
                    <p key={i} className="text-text-primary">
                      <span className="text-accent-green">&quot;{a}&quot;</span>
                      {i < exp.achievements.length - 1 && (
                        <span className="text-text-secondary">,</span>
                      )}
                    </p>
                  ))}
                </div>
                <p className="text-text-secondary">],</p>
                <p>
                  <span className="text-accent-cyan">&quot;tags&quot;</span>
                  <span className="text-text-secondary">: [</span>
                  {exp.tags.map((tag, i) => (
                    <span key={i}>
                      <span className="text-accent-yellow">&quot;{tag}&quot;</span>
                      {i < exp.tags.length - 1 && (
                        <span className="text-text-secondary">, </span>
                      )}
                    </span>
                  ))}
                  <span className="text-text-secondary">]</span>
                </p>
              </div>
              <p className="text-text-muted">{"}"}</p>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Experience;
