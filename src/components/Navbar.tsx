import { Database, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-[1.4rem] border border-border/70 bg-card/85 px-4 shadow-[0_10px_32px_-24px_hsl(var(--foreground)/0.55)] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-primary text-primary-foreground shadow-[0_8px_20px_-14px_hsl(var(--primary)/0.9)]">
            <Terminal className="h-4 w-4" />
          </div>
          <span>
            SQL<span className="text-primary">Journey</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-[1rem] px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground"
          >
            <Database className="h-4 w-4" />
            Assignments
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
