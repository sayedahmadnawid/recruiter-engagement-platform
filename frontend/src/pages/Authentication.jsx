import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { login } from "../services/authService";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  // 1. Basic validation (client-style server action validation)
  const errors = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // 2. Call service
    const data = await login(email, password);

    // 3. Save token
    localStorage.setItem("token", data.token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    // 4. Redirect
    return redirect("/dashboard");
  } catch (error) {
    // 5. Normalize backend errors (Laravel)
    if (error?.response?.status === 401) {
      return {
        message: "Invalid email or password",
      };
    }

    return {
      message: "Something went wrong. Please try again.",
    };
  }
}
