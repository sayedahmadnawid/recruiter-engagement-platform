import HeroSection from "../components/home/HeroSection";
import SkillsSection from "../components/home/SkillsSection";
import ProjectsSection from "../components/home/ProjectsSection";
import CertificationsSection from "../components/home/CertificationsSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Crisp Dot Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-16 pb-20 md:space-y-24">
        <HeroSection />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          <section id="skills" className="scroll-mt-20">
            <SkillsSection />
          </section>

          <section id="projects" className="scroll-mt-20">
            <ProjectsSection />
          </section>

          <section id="certifications" className="scroll-mt-20">
            <CertificationsSection />
          </section>
        </div>

        {/* Contact / Recruiter CTA Banner */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-lg">
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Interested in working together?
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                I’m open to full-stack software engineering opportunities,
                AI/RAG integrations, and cloud infrastructure projects.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-medium text-white transition-colors text-sm shadow-md shadow-indigo-600/20"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
