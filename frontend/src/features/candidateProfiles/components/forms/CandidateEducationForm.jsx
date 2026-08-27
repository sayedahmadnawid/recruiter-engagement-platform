import { useState } from "react";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputField";

export default function CandidateEducationForm({
  education = [],
  fieldErrors = {},
  onSave,
  onCancel,
}) {
  const [entries, setEntries] = useState(
    education.map((item) => ({
      degree: item.degree || item.qualification || "",
      institution: item.institution || item.school || item.university || "",
      field: item.field || item.major || "",
      start_date: item.start_date || item.start || "",
      end_date: item.end_date || item.end || item.graduation_year || "",
    })),
  );

  const [loading, setLoading] = useState(false);

  // Field change handler for a specific entry in the list
  const handleChange = (index, field, value) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Add new empty education entry
  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        field_of_study: "",
        start_date: "",
        end_date: "",
      },
    ]);
  };

  // Remove an entry
  const handleRemoveEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out completely empty entries before submitting
    const cleanedEntries = entries.filter(
      (item) => item.degree.trim() !== "" || item.institution.trim() !== "",
    );

    try {
      await onSave({ education: cleanedEntries });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h3 className="text-base font-bold text-gray-900">Edit Education</h3>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddEntry}
          className="text-xs py-1 px-3"
        >
          + Add Education
        </Button>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">
          No education history listed. Click "+ Add Education" to add one.
        </p>
      ) : (
        <div className="space-y-6">
          {entries.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4 relative"
            >
              {/* Card Action Header */}
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Education #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveEntry(idx)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove Entry
                </button>
              </div>

              {/* Degree & Institution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  label="Degree / Certificate"
                  name="degree"
                  value={item.degree}
                  placeholder="e.g. B.S. Computer Science"
                  onChange={(e) => handleChange(idx, "degree", e.target.value)}
                  error={fieldErrors[`education.${idx}.degree`]?.[0]}
                />

                <InputField
                  label="Institution / University"
                  name="institution"
                  value={item.institution}
                  placeholder="e.g. University of North Carolina"
                  onChange={(e) =>
                    handleChange(idx, "institution", e.target.value)
                  }
                  error={fieldErrors[`education.${idx}.institution`]?.[0]}
                />
              </div>

              {/* Field of Study & Dates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InputField
                  label="Field of Study / Major"
                  name="field"
                  value={item.field}
                  placeholder="e.g. Software Engineering"
                  onChange={(e) => handleChange(idx, "field", e.target.value)}
                  error={fieldErrors[`education.${idx}.field`]?.[0]}
                />

                <InputField
                  label="Start Date / Year"
                  name="start_date"
                  value={item.start_date}
                  placeholder="e.g. 2018"
                  onChange={(e) =>
                    handleChange(idx, "start_date", e.target.value)
                  }
                  error={fieldErrors[`education.${idx}.start_date`]?.[0]}
                />

                <InputField
                  label="End Date / Grad Year"
                  name="end_date"
                  value={item.end_date}
                  placeholder="e.g. 2022"
                  onChange={(e) =>
                    handleChange(idx, "end_date", e.target.value)
                  }
                  error={fieldErrors[`education.${idx}.end_date`]?.[0]}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Saving..." : "Save Education"}
        </Button>
      </div>
    </form>
  );
}
