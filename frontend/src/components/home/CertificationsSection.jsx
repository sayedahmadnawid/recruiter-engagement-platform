const certificates = [
  {
    name: "AWS Certified Cloud Practitioner",
    url: "https://www.credly.com/badges/46833666-c788-4c80-a6b3-3a87149764d6/public_url",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    url: "https://www.credly.com/badges/97d57736-dbca-4630-bf72-89605fbf0f99/public_url",
  },
];

export default function CertificatesSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Professional credentials and achievements
          </p>
        </div>

        {/* Certificate List */}
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                         gap-3 p-4 rounded-xl border border-gray-100
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Left side */}
              <div>
                <h3 className="text-gray-800 font-semibold">{cert.name}</h3>
                <p className="text-xs text-gray-500 mt-1">AWS Certification</p>
              </div>

              {/* Right side - Credential link */}
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium
                           text-indigo-600 hover:text-indigo-800 transition"
              >
                View Credential →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
