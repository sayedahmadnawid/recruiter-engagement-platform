import { useState } from "react";
import CandidateSkillsForm from "./forms/CandidateSkillsForm";
import Button from "../../../components/ui/Button";

export default function CandidateSkillsCard({ skills = [], onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CandidateSkillsForm
          skills={skills}
          onSave={async (updated) => {
            await onSave(updated);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">
          Skills {skills.length > 0 && `(${skills.length})`}
        </h2>
        <Button variant="secondary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No skills specified.</p>
        ) : (
          skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100"
            >
              {skill}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
