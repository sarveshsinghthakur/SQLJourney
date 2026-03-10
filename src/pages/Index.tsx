import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { assignments, type Difficulty } from "@/data/mockData";
import { ArrowRight, Database } from "lucide-react";

const difficultyColor: Record<Difficulty, string> = {
  Easy: "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  Medium: "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-500/25 dark:text-amber-200",
  Hard: "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-500/25 dark:text-rose-200",
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] px-3 pb-8 sm:px-4">
      <section className="mx-auto mt-3 max-w-6xl rounded-[1.8rem] border border-border/70 bg-card/75 px-6 py-10 shadow-[0_22px_54px_-38px_hsl(var(--foreground)/0.55)] backdrop-blur md:px-10 md:py-12">
        <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">SQL Assignments</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground sm:text-base">
          Practice SQL with guided tasks, sample datasets, and instant query feedback.
        </p>
      </section>

      <section className="mx-auto mt-6 max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="group cursor-pointer border-border/80 bg-card/95 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-38px_hsl(var(--foreground)/0.55)]"
              onClick={() => navigate(`/assignment/${assignment.id}`)}
            >
              <CardHeader className="flex-row items-start justify-between gap-2 space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[0.9rem] bg-primary/12 text-primary dark:bg-primary/25">
                    <Database className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base">{assignment.title}</CardTitle>
                </div>
                <Badge className={difficultyColor[assignment.difficulty]}>{assignment.difficulty}</Badge>
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
