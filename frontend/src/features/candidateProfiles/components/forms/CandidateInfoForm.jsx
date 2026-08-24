import { useState } from "react";
import Button from "../../../../components/ui/Button";
import InputField from "../../../../components/ui/InputField";
export default function CandidateInfoForm({ candidate, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    full_name: candidate.full_name || "",
    current_title: candidate.current_title || "",
    email: candidate.email || "",
    phone: candidate.phone || "",
    location: candidate.location || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
        Edit Basic Info
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          name="full_name"
          type="text"
          value={formData.current_title}
          onChange={(e) =>
            setFormData({ ...formData, current_title: e.target.value })
          }
        />

        <InputField
          label="Title"
          name="current_title"
          type="text"
          value={formData.current_title}
          onChange={(e) =>
            setFormData({ ...formData, current_title: e.target.value })
          }
        />

        <InputField
          label="Email"
          name="name"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <InputField
          label="PHONE"
          name="name"
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <InputField
          label="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
