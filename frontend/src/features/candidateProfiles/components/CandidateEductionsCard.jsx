import { useState } from "react";
import CandidateEducationForm from "./forms/CandidateEducationForm";
import Button from "../../../components/ui/Button";

export default function CandidateEducations({ education = [], onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CandidateEducationForm
          education={education}
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <AcademicIcon
            className="w-5 h-5 text-indigo-600"
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold text-gray-900">
            Education
            {education.length > 0 && (
              <span className="text-gray-500 font-normal">
                {" "}
                ({education.length})
              </span>
            )}
          </h2>
        </div>
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>

      {education.length === 0 ? (
        <p className="text-gray-400 text-sm italic">
          No education records extracted from resume.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((item, idx) => {
            // Safe field extraction supporting multiple JSON schemas
            const institution =
              item.institution ||
              item.school ||
              item.university ||
              "Institution Not Specified";
            const degree =
              item.degree ||
              item.field_of_study ||
              item.major ||
              "Degree / Certificate";
            const year =
              item.year ||
              item.graduation_year ||
              item.dates ||
              formatDates(item.start_date, item.end_date);
            const gpa = item.gpa ? `GPA: ${item.gpa}` : null;

            return (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gray-50 border border-gray-100 flex flex-col justify-between hover:border-indigo-100 hover:shadow-2xs transition"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                    {degree}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium">
                    {institution}
                  </p>
                </div>

                {(year || gpa) && (
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200/60 text-xs text-gray-500">
                    <span>{year}</span>
                    {gpa && (
                      <span className="font-medium text-gray-700 bg-gray-200/50 px-2 py-0.5 rounded">
                        {gpa}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper function for dates fallback
function formatDates(start, end) {
  if (!start && !end) return "";
  return `${start || ""} ${start && end ? "-" : ""} ${end || ""}`.trim();
}

// Academic Cap Icon Component
function AcademicIcon({ className = "w-5 h-5" }) {
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
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
    </svg>
  );
}
