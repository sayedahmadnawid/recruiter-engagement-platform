import { useState, useEffect } from "react";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import FileInput from "../ui/FileInput";
import { STATUS_OPTIONS } from "../../constants/leads";

export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      email: "",
      company: "",
      job_title: "",
      linkedin_url: "",
      status: "new",
      notes: "",
    },
  );

  const [resumeFile, setResumeFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setForm(
      initialData || {
        name: "",
        email: "",
        company: "",
        job_title: "",
        linkedin_url: "",
        status: "new",
        notes: "",
      },
    );

    setResumeFile(null);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Pack payload into a Multipart FormData object instead of passing a raw object
    const formData = new FormData();

    // Append your structured text properties
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("company", form.company || "");
    formData.append("job_title", form.job_title || "");
    formData.append("linkedin_url", form.linkedin_url || "");
    formData.append("status", form.status || "new");
    formData.append("notes", form.notes || "");

    // 2. Append the binary file object explicitly if selected
    if (resumeFile && resumeFile instanceof File) {
      formData.append("resume", resumeFile);
    }

    // 3. Fire the streaming payload up to your parent coordinator logic
    onSubmit(formData);

    // Reset local component states completely on creations
    if (!initialData) {
      setForm({
        name: "",
        email: "",
        company: "",
        job_title: "",
        linkedin_url: "",
        status: "new",
        notes: "",
      });
      setResumeFile(null);
    }
  };

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

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <FileInput
          label="Attach Resume (Optional)"
          accept=".pdf,.docx"
          maxSizeMB={4}
          onFileSelect={(file) => setResumeFile(file)}
          error={validationErrors.resume}
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
          type="url"
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
          required
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

        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            {initialData ? "Update Lead" : "Add Lead"}
          </button>

          {initialData && (
            <button
              type="button"
              className="w-full flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
