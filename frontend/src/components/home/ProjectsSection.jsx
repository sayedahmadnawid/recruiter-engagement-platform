const projects = [
  {
    title: "Recruiter Engagement Platform",
    description:
      "A full-stack portfolio platform built with Laravel, React, MySQL, Docker, and AWS, demonstrating event-driven architecture, queue processing, recruiter engagement tracking, and cloud-native deployment practices.",
    tags: ["Laravel", "React", "Docker", "AWS"],
    featured: true,
  },
  {
    title: "RIMS Renovation Management System",
    description:
      "Enterprise renovation information management system supporting role-based access control, approval workflows, project lifecycle management, and construction tracking for multiple stakeholders.",
    tags: ["Laravel", "MySQL", "Enterprise"],
  },
  {
    title: "HERB SHOP E-Commerce Platform",
    description:
      "Designed and developed a production e-commerce platform for a Japanese herb and gardening retailer, supporting online sales of herb plants, gardening products, and specialty goods.",
    tags: ["WordPress", "WooCommerce"],
    url: "https://shop.herbcity.jp/",
  },
  {
    title: "Open Air Brewing E-Commerce Platform",
    description:
      "Developed and customized a Shopify-based online store for a Japanese craft beer brewery, supporting direct-to-consumer sales, subscriptions, promotions, and inventory management.",
    tags: ["Shopify"],
    url: "https://www.openair.beer/",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Portfolio Showcase
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Featured Projects
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
            A selection of enterprise applications, e-commerce platforms, and cloud-native solutions I have designed and developed.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`group flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                project.featured
                  ? 'border-indigo-200 ring-1 ring-indigo-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>

                  {project.featured && (
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      Current Project
                    </span>
                  )}
                </div>

                <p className="mt-4 leading-relaxed text-sm sm:text-base text-slate-600">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Website Link CTA */}
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <span>Visit Website</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <div className="mt-6 text-xs text-slate-400 italic">
                  Internal / Enterprise Solution
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}