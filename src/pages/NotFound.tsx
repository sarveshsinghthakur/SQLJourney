import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-3 sm:px-4">
      <div className="w-full max-w-md rounded-[1.6rem] border border-border/70 bg-card/80 p-8 text-center shadow-[0_22px_60px_-36px_hsl(var(--foreground)/0.55)]">
        <h1 className="mb-2 text-4xl font-semibold">404</h1>
        <p className="mb-5 text-sm text-muted-foreground">Page not found.</p>
        <a href="/" className="inline-flex rounded-[1rem] bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
