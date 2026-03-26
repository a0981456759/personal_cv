"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import TerminalPrompt from "./TerminalPrompt";
import { socialLinks, footer } from "@/data/content";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const links = [
    { key: "email", value: socialLinks.email, href: `mailto:${socialLinks.email}`, onClick: copyEmail },
    { key: "telegram", value: "t.me/FinalFantasty", href: socialLinks.telegram },
    { key: "twitter", value: "x.com/pandazeng1", href: socialLinks.twitter },
    { key: "linkedin", value: "linkedin.com/in/wei-chieh-tseng", href: socialLinks.linkedin },
    { key: "github", value: "github.com/panda850819", href: socialLinks.github },
    { key: "medium", value: "medium.com/@kiss851990", href: socialLinks.medium },
    { key: "blog", value: "blog.pdzeng.com", href: socialLinks.blog },
  ];

  return (
    <section id="contact" ref={ref} className="mb-12">
      <TerminalPrompt command="cat contact.json" />

      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="ml-4 mt-2"
        >
          <p className="text-text-muted">{"{"}</p>
          <div className="ml-4 space-y-0.5">
            {links.map((link, i) => (
              <p key={link.key}>
                <span className="text-accent-cyan">&quot;{link.key}&quot;</span>
                <span className="text-text-secondary">: </span>
                {link.key === "email" ? (
                  <button
                    onClick={link.onClick}
                    className="text-accent-green hover:underline cursor-pointer"
                    title="Click to copy"
                  >
                    &quot;{link.value}&quot;
                    {copiedEmail && (
                      <span className="text-accent-yellow text-xs ml-2">
                        (copied!)
                      </span>
                    )}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link"
                  >
                    &quot;{link.value}&quot;
                  </a>
                )}
                {i < links.length - 1 && (
                  <span className="text-text-secondary">,</span>
                )}
              </p>
            ))}
          </div>
          <p className="text-text-muted">{"}"}</p>

          {/* Footer */}
          <div className="mt-16 pt-6 border-t border-terminal-border">
            <p className="text-text-muted text-xs">{footer.copyright}</p>
            <p className="text-text-muted text-xs">{footer.builtWith}</p>
          </div>

          {/* Static cursor at the end */}
          <div className="mt-8 flex items-center gap-2">
            <span className="text-accent-green">$</span>
            <span className="cursor-blink" />
          </div>
        </motion.div>
      )}

      {/* Mobile bottom padding for tab bar */}
      <div className="h-16 md:hidden" />
    </section>
  );
};

export default Contact;
