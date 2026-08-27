const skillCategories = [
  {
    title: "Backend",
    description:
      "Robust server-side architecture, RESTful APIs, and relational databases",
    skills: ["PHP", "Laravel", "MySQL"],
  },
  {
    title: "Frontend",
    description:
      "Responsive, reactive user interfaces and client-side web applications",
    skills: ["React", "Vue.js", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Cloud infrastructure provisioning, containerization, and deployment",
    skills: ["AWS", "CloudFormation", "Docker"],
  },
  {
    title: "E-Commerce & CMS",
    description:
      "Custom platform customization, plugin development, and online storefronts",
    skills: ["WordPress", "WooCommerce", "Shopify"],
  },
  {
    title: "Tools & Workflow",
    description: "Version control, collaboration, and modern development tools",
    skills: ["Git", "GitHub Actions", "Postman"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Technical Proficiency
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Skills & Technologies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
            I focus on full-stack web development, cloud infrastructure, and
            e-commerce solutions using modern technologies and industry best
            practices.
          </p>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-md"
            >
              {/* Category Title & Subtext */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {category.description}
                </p>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:border-indigo-300 hover:bg-white hover:text-indigo-700 hover:scale-105 shadow-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
