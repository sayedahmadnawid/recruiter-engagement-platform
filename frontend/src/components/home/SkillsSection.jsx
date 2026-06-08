const skills = [
  "React",
  "Vue.js",
  "Laravel",
  "MySQL",
  "Docker",
  "AWS",
  "Git",
  "WordPress",
  "Shopify",
];

export default function SkillsSection() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 p-6">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
          <p className="text-sm text-gray-500 mt-1">Technologies I work with</p>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full text-sm font-medium
                         bg-gradient-to-r from-indigo-500 to-purple-500
                         text-white shadow-md
                         hover:scale-105 hover:shadow-lg
                         transition-all duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
