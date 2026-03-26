"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { achievements } from "@/data/content";

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="achievements" ref={ref} className="mb-12">
      <TerminalPrompt command="cat achievements.md" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2 space-y-6"
        >
          {achievements.map((category, ci) => (
            <div key={ci} className="space-y-2">
              <p className="text-accent-purple font-bold">
                ## {category.category}
              </p>

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
                        <td className="pr-4 py-2 text-accent-yellow font-bold whitespace-nowrap">
                          {award.title}
                        </td>
                        <td className="pr-4 py-2 text-text-primary">
                          {award.link ? (
                            <a
                              href={award.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="terminal-link"
                            >
                              {award.competition}
                            </a>
                          ) : (
                            award.competition
                          )}
                        </td>
                        <td className="pr-4 py-2 text-accent-orange whitespace-nowrap">
                          {award.year}
                        </td>
                        <td className="py-2 text-text-secondary whitespace-nowrap">
                          {award.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Achievements;
