import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
//import Dashboard from "../pages/Dashboard";
import LeadsPage from "../features/leads/pages/LeadsPage";
import ProtectedRoute from "./ProtectedRoute";
import { action as logoutAction } from "../pages/Logout";
import AuthenticationPage, {
  action as authAction,
} from "../pages/Authentication";
import { tokenLoader } from "../services/authService";
import DashboardPage from "../pages/DashboardPage";
import CandidateProfilePage from "../features/candidateProfiles/pages/CandidateProfilePage";
import RagSearchPage from "../features/candidateProfiles/pages/RagSearchPage";

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
        path: "leads",
        element: (
          <ProtectedRoute>
            <LeadsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "leads/:leadId/profile",
        element: (
          <ProtectedRoute>
            <CandidateProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "rag-search",
        element: (
          <ProtectedRoute>
            <RagSearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
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
