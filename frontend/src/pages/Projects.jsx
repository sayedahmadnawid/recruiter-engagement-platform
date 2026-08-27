export default function Projects() {
  const projects = [
    {
      id: "recruitersignal",
      title: "RecruiterSignal",
      category: "AI-Powered HRTech",
      status: "Active Development",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description:
        "An intelligent recruitment and candidate evaluation platform designed to streamline talent sourcing, parse candidate data, and track applicant lifecycles with actionable insights.",
      techStack: [
        "Laravel",
        "React",
        "Tailwind CSS",
        "OpenAI API",
        "MySQL",
        "AWS",
        "Docker",
        "CI/DI",
      ],
      metrics: [
        { label: "Role", value: "Full-Stack Developer" },
        { label: "Focus", value: "AI RAG & Candidate Parsing" },
      ],
      linkText: "Explore System Architecture →",
      isPrimary: true,
    },
    {
      id: "rims",
      title: "RIMS",
      category: "Construction Management Information System",
      status: "Production",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      description:
        "A comprehensive construction management information system designed to streamline site operations, resource allocation, project scheduling, and document control across large-scale builds.",
      techStack: ["Laravel", "jQuery", "Docker", "PostgreSQL"],
      metrics: [
        { label: "Role", value: "Lead Systems Architect" },
        { label: "Focus", value: "Enterprise Workflow & Analytics" },
      ],
      linkText: "View Project Brief →",
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
            Portfolio Highlights
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Featured Systems & Applications
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl leading-relaxed">
            A showcase of enterprise-grade web applications, AI integrations,
            and management systems built with scalable full-stack architectures.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="p-8 space-y-6">
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                      {project.title}
                    </h2>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Role & Focus Badges */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <dt className="text-xs text-gray-500 font-medium">
                        {metric.label}
                      </dt>
                      <dd className="text-sm font-semibold text-gray-800 mt-0.5">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">
                  {project.isPrimary
                    ? "Live Case Study Available"
                    : "Documentation Pending"}
                </span>
                <button
                  type="button"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
                >
                  {project.linkText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
