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
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Featured Projects</h2>

        <p className="mt-3 text-gray-600">
          A selection of enterprise applications, e-commerce platforms, and
          cloud-native solutions I have designed and developed.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>

                {project.featured && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Current Project
                  </span>
                )}
              </div>

              <p className="mt-4 leading-relaxed text-gray-600">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                                    mt-6
                                    inline-flex
                                    items-center
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    transition
                                    hover:text-blue-600
                                "
              >
                Visit Website →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
