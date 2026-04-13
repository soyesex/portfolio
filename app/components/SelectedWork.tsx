interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    number: "01",
    title: "GYM-AI",
    description:
      "AI-driven fitness platform with RAG-based workout recommendations, live session tracking, and gamification. Built with Next.js 15, Supabase, and Gemini.",
    tags: ["production", "next.js · supabase · ai"],
  },
  {
    number: "02",
    title: "Playwright Suite",
    description:
      "End-to-end test automation suite demonstrating modern QA practices with Playwright and Supabase integration testing.",
    tags: ["portfolio", "playwright · typescript"],
  },
];

export default function SelectedWork() {
  return (
    <section className="w-full bg-black py-32 px-8">
      <div className="space-y-48">
        {projects.map((project) => (
          <article
            key={project.number}
            className="grid grid-cols-12 gap-8 items-start group"
          >
            {/* Left column — project number */}
            <div className="col-span-4 border-t border-white/[0.08] pt-4">
              <span className="font-mono font-light text-[120px] leading-none text-white/10 transition-colors duration-500 group-hover:text-white/30 select-none">
                {project.number}
              </span>
            </div>

            {/* Right column — project details */}
            <div className="col-span-8 border-t border-white/[0.08] pt-4 flex flex-col justify-between gap-8">
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.03em] mb-4 text-white">
                  {project.title}
                </h2>
                <p className="text-white/60 max-w-md leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-widest">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 px-3 py-1 text-white/60 w-fit"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
