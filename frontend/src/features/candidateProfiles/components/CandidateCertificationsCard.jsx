import { useState } from "react";
import CandidateCertificationsForm from "./forms/CandidateCertificationsForm";
import Button from "../../../components/ui/Button";
export default function CandidateCertificationsCard({ certifications = [], onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CandidateCertificationsForm
          certifications={certifications}
          fieldErrors={fieldErrors}
          onSave={async (updated) => {
            try {
              setFieldErrors({});
              await onSave(updated);
              setIsEditing(false);
            } catch (err) {
              if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors);
              }
            }
          }}
          onCancel={() => {
            setFieldErrors({});
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <BadgeIcon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
          <h2 className="text-lg font-bold text-gray-900">
            Certifications
            {certifications.length > 0 && (
              <span className="text-gray-500 font-normal">
                {" "}
                ({certifications.length})
              </span>
            )}
          </h2>
        </div>
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>

      {certifications.length === 0 ? (
        <p className="text-gray-400 text-sm italic">
          No certifications listed on resume.
        </p>
      ) : (
        <ul className="space-y-3">
          {certifications.map((item, idx) => {
            // Handle both simple string arrays ["AWS Certified...", "..."]
            // and structured object arrays [{ name: "...", issuer: "...", year: "..." }]
            const isString = typeof item === "string";
            const name = isString
              ? item
              : item.name ||
                item.title ||
                item.certification_name ||
                "Certification";
            const issuer = !isString
              ? item.issuer || item.organization || item.authority
              : null;
            const date = !isString
              ? item.year || item.date || item.issued_date || item.issue_date
              : null;

            return (
              <li
                key={idx}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition"
              >
                {/* Status Indicator Badge */}
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />

                <div className="space-y-0.5 flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug truncate">
                    {name}
                  </p>

                  {(issuer || date) && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {issuer && <span>{issuer}</span>}
                      {issuer && date && <span>•</span>}
                      {date && <span>{date}</span>}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Certificate / Badge Icon
function BadgeIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}
