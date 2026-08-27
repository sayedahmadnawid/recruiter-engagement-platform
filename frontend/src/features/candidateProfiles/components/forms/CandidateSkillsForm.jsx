import { useState } from "react";
import Button from "../../../../components/ui/Button";

export default function CandidateSkillsForm({ skills = [], onSave, onCancel }) {
  const [skillList, setSkillList] = useState(skills);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Add skill tag when user presses Enter or commas
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmed = inputValue.trim().replace(/,/g, "");
    if (trimmed && !skillList.includes(trimmed)) {
      setSkillList((prev) => [...prev, trimmed]);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkillList((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalSkills = [...skillList];
    const trimmed = inputValue.trim().replace(/,/g, "");
    if (trimmed && !finalSkills.includes(trimmed)) {
      finalSkills.push(trimmed);
    }

    setLoading(true);
    try {
      await onSave({ skills: finalSkills });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Edit Skills
        </h3>
        <span className="text-xs text-gray-500">
          Press Enter or comma to add
        </span>
      </div>

      {/* Input Field + Add Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Laravel, React, Docker"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={addSkill}
          disabled={!inputValue.trim()}
        >
          Add
        </Button>
      </div>

      {/* Interactive Skill Badges */}
      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-gray-50 rounded-lg border border-gray-200">
        {skillList.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No skills listed yet.</p>
        ) : (
          skillList.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-indigo-400 hover:text-indigo-600 focus:outline-none font-bold"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>

      {/* Form Action Controls */}
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
