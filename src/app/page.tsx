import TerminalWindow from "@/components/TerminalWindow";
import Terminal from "@/components/Terminal";
import { personalInfo, about, experiences, projects, achievements, education, skills, socialLinks } from "@/data/content";

export default function Home() {
  return (
    <>
      <TerminalWindow>
        <Terminal />
      </TerminalWindow>

      {/* SEO: Hidden semantic HTML for crawlers and screen readers */}
      <div className="sr-only" aria-hidden="false">
        <article>
          <h1>{personalInfo.name} &mdash; {personalInfo.title}</h1>
          <p>{personalInfo.tagline}</p>

          <section>
            <h2>About</h2>
            {about.description.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          <section>
            <h2>Experience</h2>
            {experiences.map((exp, i) => (
              <div key={i}>
                <h3>{exp.company} &mdash; {exp.position}</h3>
                <p>{exp.period} | {exp.location}</p>
                <p>{exp.description}</p>
                <ul>
                  {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Projects</h2>
            {projects.map((p, i) => (
              <div key={i}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Achievements</h2>
            {achievements.map((cat, i) => (
              <div key={i}>
                <h3>{cat.category}</h3>
                <ul>
                  {cat.awards.map((a, j) => (
                    <li key={j}>{a.title} &mdash; {a.competition} ({a.year}, {a.location})</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Education</h2>
            {education.map((e, i) => (
              <div key={i}>
                <h3>{e.school}</h3>
                <p>{e.degree} &mdash; {e.major} ({e.period})</p>
              </div>
            ))}
          </section>

          <section>
            <h2>Skills</h2>
            {skills.map((cat, i) => (
              <div key={i}>
                <h3>{cat.category}</h3>
                <ul>
                  {cat.items.map((item, j) => <li key={j}>{item.name}: {item.level}/100</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Contact</h2>
            <p>Email: {socialLinks.email}</p>
            <p>GitHub: {socialLinks.github}</p>
          </section>
        </article>
      </div>
    </>
  );
}
