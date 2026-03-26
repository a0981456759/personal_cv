"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { about } from "@/data/content";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="about" ref={ref} className="mb-12">
      <TerminalPrompt command="cat about.md" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-4"
        >
          {/* Markdown-style header */}
          <p className="text-accent-purple font-bold"># {about.headline}</p>

          {about.description.map((paragraph, i) => (
            <p key={i} className="text-text-primary leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Highlights as bullet list */}
          <div className="mt-4 space-y-1">
            <p className="text-accent-purple font-bold">## Highlights</p>
            {about.highlights.map((h, i) => (
              <p key={i} className="text-text-primary">
                <span className="text-accent-yellow">-</span> {h}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default About;
