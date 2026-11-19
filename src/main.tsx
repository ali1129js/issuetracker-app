import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { KEYS, preferredTheme, readStored, themeSchema } from "./lib/storage";
import { applyTheme } from "./theme/themes";
import "./index.css";

applyTheme(readStored(KEYS.theme, themeSchema, preferredTheme()));

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
