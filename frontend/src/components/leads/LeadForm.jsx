// LeadForm.jsx
import { useState } from "react";
import InputField from "../ui/InputField";

export default function LeadForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    job_title: "",
    linkedin_url: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    setForm({
      name: "",
      email: "",
      company: "",
      job_title: "",
      linkedin_url: "",
      notes: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Create New Lead</h2>
        <p className="text-sm text-gray-500 mt-1">
          Capture details for your new prospective client.
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

        <InputField
          label="Notes / Details"
          name="notes"
          placeholder="Provide any additional context..."
          value={form.notes}
          onChange={handleChange}
          textarea
          rows={3}
        />

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Add Lead
          </button>
        </div>
      </form>
    </div>
  );
}
