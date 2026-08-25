import { useState } from "react";
import CandidateExperienceForm from "./forms/CandidateExperienceForm";
import Button from "../../../components/ui/Button";

export default function CandidateExperience({ experience = [], onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CandidateExperienceForm
          experience={experience}
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
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center m-6">
        <h2 className="text-lg font-bold text-gray-900">
          Work Experience {experience.length > 0 && `(${experience.length})`}
        </h2>
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>

      {experience.length === 0 ? (
        <p className="text-gray-400 text-sm">No experience recorded.</p>
      ) : (
        <div className="relative border-l-2 border-indigo-100 pl-6 ml-3 space-y-8">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-white" />
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold text-gray-900">
                  {exp.title || exp.role || "Position"}
                </h3>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {exp.dates ||
                    `${exp.start_date || ""} - ${exp.end_date || "Present"}`}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {exp.company} {exp.location ? `• ${exp.location}` : ""}
              </p>
              {exp.description && (
                <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
