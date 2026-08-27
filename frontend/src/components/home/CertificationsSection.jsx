import React from 'react';

const certificates = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/97d57736-dbca-4630-bf72-89605fbf0f99/public_url",
    featured: true,
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/46833666-c788-4c80-a6b3-3a87149764d6/public_url",
    featured: false,
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            Verified Knowledge
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Certifications
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
            Professional cloud credentials and technical achievements validated by Amazon Web Services.
          </p>
        </div>

        {/* Certificate List Container */}
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
                cert.featured
                  ? 'border-indigo-200 ring-1 ring-indigo-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Left Side: Title & Badge */}
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cert.name}
                    </h3>
                    {cert.featured && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                        Associate
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Issued by {cert.issuer} • Verified via Credly
                  </p>
                </div>
              </div>

              {/* Right Side: Link */}
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-center"
              >
                <span>View Credential</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}