import { useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function Login() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // References for programmatically auto-filling the input fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const DEMO_EMAIL = "admin@example.com";
  const DEMO_PASSWORD = "password123";

  const handleAutoFill = () => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = DEMO_EMAIL;
      passwordRef.current.value = DEMO_PASSWORD;
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
      <p className="text-sm text-gray-600 mb-6">
        Sign in to manage candidate profiles and system settings.
      </p>

      {/* Public Demo Credentials Banner */}
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Public Demo Access
          </span>
        </div>

        <div className="text-xs text-indigo-900 space-y-1">
          <p>
            <span className="font-semibold text-indigo-700">Email:</span>{" "}
            <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-indigo-100 text-gray-800">
              {DEMO_EMAIL}
            </code>
          </p>
          <p>
            <span className="font-semibold text-indigo-700">Password:</span>{" "}
            <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-indigo-100 text-gray-800">
              {DEMO_PASSWORD}
            </code>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="w-full py-1.5 text-xs font-semibold text-indigo-700 bg-white border border-indigo-200 rounded hover:bg-indigo-100/50 transition-colors shadow-sm"
        >
          ⚡ Auto-fill Demo Credentials
        </button>
      </div>

      <Form method="post" className="space-y-4">
        {/* General error message */}
        {data?.message && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {data.message}
          </div>
        )}

        {/* Validation field errors */}
        {data?.errors && (
          <ul className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm list-disc list-inside space-y-1">
            {Object.values(data.errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Email Address
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            required
            className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black hover:bg-gray-800 text-white font-medium px-4 py-3 w-full rounded transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </Form>
    </div>
  );
}
