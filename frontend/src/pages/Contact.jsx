import { useState } from "react";
import api from "../services/api";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const emptyForm = {
    name: "",
    email: "",
    company: "",
    message: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await api.post("/messages", form);

      showToast("Message sent successfully!", "success");
      setForm(emptyForm);
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        setErrors(Object.values(serverErrors).flat());
      } else {
        setErrors([err.response?.data?.message || "Something went wrong"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>

      <p className="text-gray-600 mb-8">
        Feel free to reach out for opportunities or collaborations.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Your Name"
          name="name"
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <InputField
          label="Your Email"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
        />

        <InputField
          label="Company (optional)"
          name="company"
          type="text"
          placeholder="Company (optional)"
          value={form.company}
          onChange={handleChange}
        />

        <InputField
          label="Your Message"
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          textarea
          rows={5}
        />

        {errors && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
