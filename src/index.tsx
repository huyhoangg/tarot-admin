import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import axios from "axios";
import AuthProvider from "./contexts/AdminAuthContext";
import App from "./App";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </StrictMode>
);
