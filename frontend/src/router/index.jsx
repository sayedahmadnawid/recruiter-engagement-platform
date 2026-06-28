import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import LeadsPage from "../pages/LeadsPage";
import ProtectedRoute from "./ProtectedRoute";
import { action as logoutAction } from "../pages/Logout";
import AuthenticationPage, {
  action as authAction,
} from "../pages/Authentication";
import { tokenLoader } from "../services/authService";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "/dashboard/leads",
        element: <LeadsPage />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);
