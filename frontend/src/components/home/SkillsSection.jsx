const skillCategories = [
  {
    title: "Backend",
    skills: ["PHP", "Laravel", "MySQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Vue.js"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "CloudFormation", "Docker"],
  },
  {
    title: "E-Commerce & CMS",
    skills: ["WordPress", "WooCommerce", "Shopify"],
  },
  {
    title: "Tools",
    skills: ["Git"],
  },
];

export default function SkillsSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Skills & Technologies</h2>

        <p className="mt-3 text-gray-600">
          I focus on full-stack web development, cloud infrastructure, and
          e-commerce solutions using modern technologies and industry best
          practices.
        </p>
      </div>

      <div className="space-y-8">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-lg font-semibold mb-3">{category.title}</h3>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border px-4 py-2 text-sm font-medium  bg-white shadow-sm hover:shadow-md transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
