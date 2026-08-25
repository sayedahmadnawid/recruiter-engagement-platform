import { useState } from "react";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputField";

export default function CandidateExperienceForm({
  experience = [],
  fieldErrors,
  onSave,
  onCancel,
}) {
  const [entries, setEntries] = useState(
    experience.map((item) => ({
      title: item.title || item.position || item.role || "",
      company: item.company || item.organization || "",
      location: item.location || "",
      start_date: item.start_date || "",
      end_date: item.end_date || "",
      is_current: item.is_current || false,
      description: item.description || item.summary || "",
    })),
  );

  const [loading, setLoading] = useState(false);

  // Field change handler for specific entry in array
  const handleChange = (index, field, value) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Add new empty experience block
  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        title: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        is_current: false,
        description: "",
      },
    ]);
  };

  // Remove experience entry
  const handleRemoveEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clean out empty items before submitting
    const cleanedEntries = entries.filter(
      (item) => item.title.trim() !== "" || item.company.trim() !== "",
    );

    try {
      await onSave({ experience: cleanedEntries });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h3 className="text-base font-bold text-gray-900">
          Edit Work Experience
        </h3>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddEntry}
          className="text-xs py-1 px-3"
        >
          + Add Experience
        </Button>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">
          No experience records. Click "+ Add Experience" to create one.
        </p>
      ) : (
        <div className="space-y-6">
          {entries.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-4"
            >
              {/* Card Top Action Bar */}
              <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Position #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveEntry(idx)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove Entry
                </button>
              </div>

              {/* Title & Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <InputField
                    label="Job Title"
                    name="title"
                    type="text"
                    value={item.title}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    onChange={(e) => handleChange(idx, "title", e.target.value)}
                    error={fieldErrors[`experience.${idx}.title`]?.[0]}
                  />
                </div>

                <div>
                  <InputField
                    label="Company"
                    type="text"
                    value={item.company}
                    onChange={(e) =>
                      handleChange(idx, "company", e.target.value)
                    }
                    placeholder="e.g. Acme Corp"
                    error={fieldErrors[`experience.${idx}.company`]?.[0]}
                  />
                </div>
              </div>

              {/* Location & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <InputField
                    label="Location"
                    type="text"
                    value={item.location}
                    onChange={(e) =>
                      handleChange(idx, "location", e.target.value)
                    }
                    placeholder="e.g. Charlotte, NC (or Remote)"
                  />
                </div>
                <div>
                  <InputField
                    label="Start Date"
                    type="text"
                    value={item.start_date}
                    onChange={(e) =>
                      handleChange(idx, "start_date", e.target.value)
                    }
                    placeholder="e.g. Jan 2022"
                  />
                </div>
                <div>
                  <InputField
                    label="End Date"
                    type="text"
                    value={item.is_current ? "Present" : item.end_date}
                    disabled={item.is_current}
                    onChange={(e) =>
                      handleChange(idx, "end_date", e.target.value)
                    }
                    placeholder="e.g. Present or Dec 2024"
                  />
                </div>
              </div>

              {/* Current Role Toggle */}
              <div className="flex items-center gap-2">
                <InputField
                  type="checkbox"
                  id={`current-${idx}`}
                  checked={item.is_current}
                  onChange={(e) =>
                    handleChange(idx, "is_current", e.target.checked)
                  }
                />
                <label
                  htmlFor={`current-${idx}`}
                  className="text-xs font-medium text-gray-700"
                >
                  Candidate currently works here
                </label>
              </div>

              {/* Description / Highlights Textarea */}
              <div>
                <InputField
                  label="Summary  Responsibilities"
                  textarea
                  rows={5}
                  value={item.description}
                  onChange={(e) =>
                    handleChange(idx, "description", e.target.value)
                  }
                  placeholder="Key achievements, stack used, responsibilities..."
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
          {loading ? "Saving..." : "Save Experience"}
        </Button>
      </div>
    </form>
  );
}
