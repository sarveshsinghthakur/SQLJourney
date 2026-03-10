import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const STORAGE_KEY = "sql-journey-theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-9 rounded-[1rem] border-border/70 bg-background/80 px-3"
      onClick={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="text-xs">{theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
};

export default ThemeToggle;
