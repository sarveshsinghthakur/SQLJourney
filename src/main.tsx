import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const savedTheme = window.localStorage.getItem("sql-journey-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDark = savedTheme === "dark" || (savedTheme !== "light" && prefersDark);
document.documentElement.classList.toggle("dark", shouldUseDark);

createRoot(document.getElementById("root")!).render(<App />);
