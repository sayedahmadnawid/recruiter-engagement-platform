import { useState, useEffect, useActionState } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import FileInput from "../ui/FileInput";
import { useToast } from "../../context/ToastContext";
import { STATUS_OPTIONS } from "../../constants/leads";
import Button from "../ui/Button";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isLinkedInUrl,
} from "../../util/validation";

export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const emptyForm = {
    name: "",
    email: "",
    company: "",
    job_title: "",
    linkedin_url: "",
    status: "new",
    notes: "",
  };

  const [form, setForm] = useState(initialData || emptyForm);
  const [resumeFile, setResumeFile] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    setForm(initialData || emptyForm);
    setResumeFile(null);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitAction = async () => {
    const errors = [];

    if (!isNotEmpty(form.name) || !hasMinLength(form.name, 3)) {
      errors.push("Name is required.");
    }
    if (!isNotEmpty(form.email) || !isEmail(form.email)) {
      errors.push("Email is required.");
    }
    if (!isNotEmpty(form.company)) {
      errors.push("Company is required.");
    }
    if (!isNotEmpty(form.job_title)) {
      errors.push("Job title is required.");
    }
    if (!isNotEmpty(form.linkedin_url) || !isLinkedInUrl(form.linkedin_url)) {
      errors.push("LinkedIn URL is required.");
    }
    if (!isNotEmpty(form.status)) {
      errors.push("Status is required.");
    }

    if (errors.length > 0) {
      return { errors };
    }

    // Pack payload into a Multipart FormData object instead of passing a raw object
    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("company", form.company || "");
    payload.append("job_title", form.job_title || "");
    payload.append("linkedin_url", form.linkedin_url || "");
    payload.append("status", form.status || "new");
    payload.append("notes", form.notes || "");

    if (resumeFile instanceof File) {
      payload.append("resume", resumeFile);
    }

    try {
      // Fire the streaming payload up to your parent coordinator logic
      await onSubmit(payload);
      // Reset local component state completely on creation (not on edit)
      if (!initialData) {
        setForm(emptyForm);
        setResumeFile(null);
      }

      showToast(
        initialData
          ? "Lead updated successfully!"
          : "Lead created successfully!",
        "success",
      );

      return { errors: null };
    } catch (err) {
      console.error("LeadForm submitAction error:", err.response?.data || err);
      const serverErrors = err.response?.data?.errors;

      if (serverErrors) {
        return { errors: Object.values(serverErrors).flat() };
      }

      // Fallback for non-validation errors (network failure, 500, etc.)
      return {
        errors: [
          err.response?.data?.message ||
            "Failed to save lead. Please try again.",
        ],
      };
    }
  };

  const [formState, formAction, pending] = useActionState(submitAction, {
    errors: null,
  });

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {initialData ? "Edit Lead Details" : "Create New Lead"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Capture details for your prospective client.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            label="Email Address"
            name="email"
            type="text"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <FileInput
          label="Attach Resume (Optional)"
          accept=".pdf,.doc,.docx"
          name="resume"
          maxSizeMB={4}
          onFileSelect={(file) => setResumeFile(file)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Company"
            name="company"
            type="text"
            placeholder="Acme Corp"
            value={form.company}
            onChange={handleChange}
          />

          <InputField
            label="Job Title"
            name="job_title"
            type="text"
            placeholder="Sales Manager"
            value={form.job_title}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="LinkedIn Profile"
          name="linkedin_url"
          type="text"
          placeholder="https://linkedin.com/in/username"
          value={form.linkedin_url}
          onChange={handleChange}
        />

        <SelectField
          label="Lead Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={STATUS_OPTIONS}
        />

        <InputField
          label="Notes / Details"
          name="notes"
          placeholder="Provide any additional context..."
          value={form.notes}
          onChange={handleChange}
          textarea
          rows={3}
        />

        {formState.errors && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
            <ul className="list-disc list-inside">
              {formState.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={pending}
          >
            {pending ? "Saving..." : initialData ? "Update Lead" : "Add Lead"}
          </Button>

          {initialData && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="w-full"
              disabled={pending}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
