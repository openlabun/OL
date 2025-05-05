// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/firebase.ts";

import { AuthProvider } from "@/core/context/AuthContext.tsx";
import { AppRouter } from "./core/router/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
