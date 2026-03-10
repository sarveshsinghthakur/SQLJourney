import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, RotateCcw } from "lucide-react";
import { assignments, type Difficulty } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import HintDialog from "@/components/HintDialog";
import ResultsPanel from "@/components/ResultsPanel";
import SampleDataViewer from "@/components/SampleDataViewer";
import SqlEditor from "@/components/SqlEditor";

const difficultyColor: Record<Difficulty, string> = {
  Easy: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  Medium: "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-500/25 dark:text-amber-200",
  Hard: "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-500/25 dark:text-rose-200",
};

const AssignmentAttempt = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const assignment = assignments.find((item) => item.id === id);

  const [sql, setSql] = useState("");
  const [results, setResults] = useState<Record<string, string | number | null>[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = useCallback(() => {
    if (!assignment || !sql.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    window.setTimeout(() => {
      const trimmedSql = sql.trim().toLowerCase();

      if (trimmedSql.includes("drop") || trimmedSql.includes("delete") || trimmedSql.includes("truncate")) {
        setError("ERROR: Destructive operations (DROP, DELETE, TRUNCATE) are not allowed in this sandbox.");
      } else if (!trimmedSql.startsWith("select")) {
        setError("ERROR: Only SELECT statements are allowed.");
      } else {
        setResults(assignment.mockResult);
      }

      setIsLoading(false);
    }, 800);
  }, [assignment, sql]);

  const handleClear = () => {
    setSql("");
    setResults(null);
    setError(null);
  };

  if (!assignment) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-3 sm:px-4">
        <p className="rounded-[1rem] border border-border/70 bg-card/85 px-5 py-3 text-sm text-muted-foreground">
          Assignment not found.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-5rem)] overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-3">
        <div className="flex items-center gap-3 rounded-[1.35rem] border border-border/70 bg-card/80 px-3 py-2 shadow-[0_12px_34px_-28px_hsl(var(--foreground)/0.6)]">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}> 
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="truncate text-sm font-semibold sm:text-base">{assignment.title}</h1>
          <Badge className={difficultyColor[assignment.difficulty] + " text-[10px]"}>{assignment.difficulty}</Badge>
          <div className="ml-auto">
            <HintDialog hints={assignment.hints} />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
          <section className="flex min-h-0 flex-col overflow-hidden rounded-[1.4rem] border border-border/70 bg-card/75 lg:w-[360px]">
            <ScrollArea className="max-h-[46%] border-b border-border/70 p-4 lg:max-h-none lg:flex-1">
              <h2 className="mb-2 text-sm font-semibold">Question</h2>
              <p className="mb-3 text-sm text-muted-foreground">{assignment.details}</p>
              {assignment.constraints.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-medium">Constraints</p>
                  <ul className="list-disc space-y-0.5 pl-4">
                    {assignment.constraints.map((constraint, index) => (
                      <li key={index} className="text-xs text-muted-foreground">
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ScrollArea>
            <div className="min-h-[220px] flex-1 border-t border-border/70">
              <SampleDataViewer tables={assignment.tables} />
            </div>
          </section>

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.4rem] border border-border/70 bg-card/75">
            <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
              <span className="text-xs font-medium text-muted-foreground">SQL Editor</span>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 gap-1 text-xs">
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </Button>
                <Button size="sm" onClick={handleRun} disabled={isLoading} className="h-8 gap-1 text-xs">
                  <Play className="h-3.5 w-3.5" />
                  Run
                  <kbd className="ml-1 hidden rounded-md border border-primary-foreground/20 bg-primary-foreground/15 px-1 text-[10px] sm:inline">
                    Ctrl+Enter
                  </kbd>
                </Button>
              </div>
            </div>
            <div className="min-h-[220px] flex-1 overflow-hidden">
              <SqlEditor value={sql} onChange={setSql} onRun={handleRun} />
            </div>
            <div className="h-[40%] min-h-[170px] border-t border-border/70 p-2">
              <ResultsPanel results={results} error={error} isLoading={isLoading} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssignmentAttempt;
