import { useState } from "react";
import api from "../services/api";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { Mail, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";

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
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const issues = [];
    if (!form.name.trim()) issues.push("Name is required.");
    if (!form.email.trim()) {
      issues.push("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      issues.push("Enter a valid email address.");
    }
    if (!form.message.trim()) issues.push("Message is required.");
    return issues;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setSent(false);

    const clientErrors = validate();
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post("/messages", form);

      showToast("Message sent successfully!", "success");
      setForm(emptyForm);
      setSent(true);
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
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Get in Touch
        </h1>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Feel free to reach out for opportunities, collaborations, or just to
          say hello.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Info panel */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Email</p>
              <p className="text-sm text-gray-600">sayed.sayedzada@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Location</p>
              <p className="text-sm text-gray-600">
                Charlotte, North Carolina, U.S.
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 border-t border-gray-100 pt-6">
            Please feel free to contact me directly through my{" "}
            <a
              href="https://www.linkedin.com/in/sayednawid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-medium"
            >
              LinkedIn profile
            </a>{" "}
            or via my email (sayed.sayedzada@gmail.com). I typically respond within 1–2 business days.
          </p>
        </div>

        {/* Form card */}
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField
                label="Your Name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <InputField
                label="Your Email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <InputField
              label="Company (optional)"
              name="company"
              type="text"
              placeholder="Company name"
              value={form.company}
              onChange={handleChange}
              disabled={loading}
            />

            <InputField
              label="Your Message"
              name="message"
              placeholder="Tell me a bit about what you have in mind..."
              value={form.message}
              onChange={handleChange}
              disabled={loading}
              textarea
              rows={5}
              required
            />

            {errors && (
              <div
                role="alert"
                aria-live="polite"
                className="flex gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <ul className="space-y-0.5">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {sent && !errors && (
              <div
                role="status"
                className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Thanks — your message has been sent.
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled
              className="w-full sm:w-auto"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
