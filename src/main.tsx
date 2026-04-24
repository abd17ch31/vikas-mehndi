import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SiteContentProvider } from "@/components/providers/site-content-provider";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteContentProvider>
      <App />
    </SiteContentProvider>
  </StrictMode>
);
