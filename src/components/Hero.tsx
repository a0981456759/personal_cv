"use client";

import { motion } from "framer-motion";
import TerminalPrompt from "./TerminalPrompt";
import { personalInfo } from "@/data/content";

const ASCII_PANDA = `
    .--.              .--.
   |o_o |            |o_o |
   |:_/ |            |:_/ |
  //   \\ \\          // \\   \\
 (|     | )        (|     | )
/'\\_   _/\`\\      /'\\_   _/\`\\
\\___)=(___/      \\___)=(___/
`;

const Hero = () => {
  return (
    <section className="mb-12">
      {/* ASCII Art */}
      <motion.pre
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-accent-green text-[10px] sm:text-xs leading-tight mb-6 hidden sm:block"
        aria-hidden="true"
      >
        {ASCII_PANDA}
      </motion.pre>

      <TerminalPrompt command="whoami" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="ml-4 space-y-1 mt-2"
      >
        <p className="text-xl sm:text-2xl font-bold text-text-primary">
          {personalInfo.name}
        </p>
        <p className="text-accent-purple">{personalInfo.title}</p>
        <p className="text-text-secondary">{personalInfo.tagline}</p>
        <p className="text-text-secondary text-sm mt-2">
          <span className="text-accent-yellow">location:</span> {personalInfo.location}
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
