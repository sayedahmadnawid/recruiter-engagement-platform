const projects = [
  {
    title: "Recruiter Engagement Platform",
    description:
      "A platform designed to streamline recruiter-candidate interactions, messaging, and engagement tracking.",
    tag: "Full Stack",
  },
  {
    title: "RIMS Renovation Management System",
    description:
      "A role-based renovation information management system with approval workflows and project tracking.",
    tag: "Enterprise System",
  },
  {
    title: "HERB SHOP E-Commerce Platform",
    description:
      "Designed and developed a production e-commerce platform for a Japanese herb and gardening retailer, supporting online sales of herb plants, gardening products, and specialty goods.",
    tag: ["Woocommerce"],
    url: "https://shop.herbcity.jp/",
  },
  {
    title: "Open Air Brewing E-Commerce Platform",
    description:
      "Developed and customized a Shopify-based online store for a Japanese craft beer brewery, supporting direct-to-consumer sales, subscriptions, promotions, and inventory management.",
    tag: "Shopify",
    url: "https://www.openair.beer/",
  },
];

export default function ProjectsSection() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Featured Projects
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Some systems I’ve designed and developed
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Tag */}
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                {project.tag}
              </span>

              {/* Title */}
              <h3 className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {project.description}
              </p>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  Visit Website →
                </a>
              )}

              {/* Footer line */}
              <div className="mt-4 h-px bg-gray-100"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
