import { Link } from "react-router-dom";

export default function HeroSection() {
  const techStack = [
    "Laravel",
    "React",
    "Vue.js",
    "PHP",
    "Tailwind CSS",
    "AWS",
    "Docker",
    "MySQL",
    "REST APIs",
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Soft Light Mesh Accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[350px] w-[600px] rounded-full bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-transparent blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Availability / Subtitle Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Full Stack Developer
        </div>

        {/* Main Heading */}
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
          Sayed Ahmad Nawid
        </h1>

        {/* Certification Badge */}
        <div className="mt-3 flex items-center gap-2 text-sm sm:text-base font-semibold text-amber-700">
          <svg
            className="h-5 w-5 flex-shrink-0 text-amber-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>AWS Certified Solutions Architect – Associate</span>
        </div>

        {/* Professional Summary */}
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 font-normal">
          Full Stack Developer with experience building enterprise applications,
          e-commerce platforms, and cloud-native solutions using Laravel, React,
          Vue.js, AWS, Docker, and MySQL.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Projects
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
          >
            Contact Me
          </Link>
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-12 border-t border-slate-200/80 pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Core Technologies & Cloud Infrastructure
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
