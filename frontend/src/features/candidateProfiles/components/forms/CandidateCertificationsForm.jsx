import { useState } from "react";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputField";

export default function CertificationsForm({
  certifications = [],
  fieldErrors = {},
  onSave,
  onCancel,
}) {
  // Normalize initial data to handle string arrays or object arrays cleanly
  const [entries, setEntries] = useState(
    certifications.map((item) => {
      if (typeof item === "string") {
        return {
          name: item,
          issuing_organization: "",
          issue_date: "",
          credential_id: "",
        };
      }
      return {
        name: item.name || item.title || "",
        issuing_organization:
          item.issuing_organization || item.issuer || item.organization || "",
        issue_date: item.issue_date || item.date || item.year || "",
        credential_id: item.credential_id || item.license_number || "",
      };
    }),
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    setEntries((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        name: "",
        issuing_organization: "",
        issue_date: "",
        credential_id: "",
      },
    ]);
  };

  const handleRemoveEntry = (index) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out completely empty entries
    const cleanedEntries = entries.filter((item) => item.name.trim() !== "");

    try {
      await onSave({ certifications: cleanedEntries });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Controls */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <h3 className="text-base font-bold text-gray-900">
          Edit Certifications
        </h3>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddEntry}
          className="text-xs py-1 px-3"
        >
          + Add Certification
        </Button>
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">
          No certifications listed. Click "+ Add Certification" to add one.
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
                  Certification #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveEntry(idx)}
                  className="text-xs text-red-600 hover:text-red-800 font-medium"
                >
                  Remove Entry
                </button>
              </div>

              {/* Name & Issuer Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  label="Certification Name *"
                  name="name"
                  value={item.name}
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  onChange={(e) => handleChange(idx, "name", e.target.value)}
                  error={fieldErrors[`certifications.${idx}.name`]?.[0]}
                  required
                />

                <InputField
                  label="Issuing Organization"
                  name="issuing_organization"
                  value={item.issuing_organization}
                  placeholder="e.g. Amazon Web Services, Pearson VUE"
                  onChange={(e) =>
                    handleChange(idx, "issuing_organization", e.target.value)
                  }
                  error={
                    fieldErrors[
                      `certifications.${idx}.issuing_organization`
                    ]?.[0]
                  }
                />
              </div>

              {/* Date & Credential ID Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  label="Issue Date / Year"
                  name="issue_date"
                  value={item.issue_date}
                  placeholder="e.g. Mar 2026"
                  onChange={(e) =>
                    handleChange(idx, "issue_date", e.target.value)
                  }
                  error={fieldErrors[`certifications.${idx}.issue_date`]?.[0]}
                />

                <InputField
                  label="Credential ID / URL"
                  name="credential_id"
                  value={item.credential_id}
                  placeholder="e.g. AWS-12345678"
                  onChange={(e) =>
                    handleChange(idx, "credential_id", e.target.value)
                  }
                  error={
                    fieldErrors[`certifications.${idx}.credential_id`]?.[0]
                  }
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
          {loading ? "Saving..." : "Save Certifications"}
        </Button>
      </div>
    </form>
  );
}
