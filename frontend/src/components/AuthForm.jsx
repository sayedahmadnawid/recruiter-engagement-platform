import { Form, useActionData } from "react-router-dom";

export default function Login() {
  const data = useActionData();

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

      <Form method="post" className="space-y-4">
        {/* General error */}
        {data?.message && <p className="text-red-500">{data.message}</p>}

        {/* Field errors */}
        {data?.errors && (
          <ul className="text-red-500">
            {Object.values(data.errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3"
        />

        <button className="bg-black text-white px-4 py-2 w-full">Login</button>
      </Form>
    </div>
  );
}
