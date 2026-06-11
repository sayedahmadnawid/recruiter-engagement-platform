import { redirect } from "react-router-dom";
import api from "../services/api";

export async function action() {
  try {
    await api.post("/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  return redirect("/");
}
