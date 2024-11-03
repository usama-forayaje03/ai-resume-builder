import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./home/index.jsx";
import DashBoard from "./dashBoard/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashBoard/resume/[resumeId]/edit/index.jsx";

// Import your publishable key
const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const router = createBrowserRouter([
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/dashBoard",
        element: <DashBoard />,
      },
      {
        path: '/dashBoard/resume/:resumeId/edit',
        element: <EditResume/>
      }
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
