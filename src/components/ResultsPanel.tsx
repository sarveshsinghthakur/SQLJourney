import { AlertCircle, Loader2, PlayCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultsPanelProps {
  results: Record<string, string | number | null>[] | null;
  error: string | null;
  isLoading: boolean;
}

const ResultsPanel = ({ results, error, isLoading }: ResultsPanelProps) => {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Executing query...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex w-full max-w-lg items-start gap-2 rounded-[1rem] border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <pre className="whitespace-pre-wrap font-mono text-xs">{error}</pre>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1 text-muted-foreground">
        <PlayCircle className="h-6 w-6" />
        <span className="text-sm">Run a query to see results</span>
        <span className="text-xs">Ctrl + Enter</span>
      </div>
    );
  }

  if (results.length === 0) {
    return <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Query returned 0 rows.</div>;
  }

  const columns = Object.keys(results[0]);

  return (
    <ScrollArea className="h-full rounded-[1rem] border border-border/70 bg-background/70">
      <div className="p-2">
        <p className="mb-1 text-xs text-muted-foreground">{results.length} row(s) returned</p>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="h-9 whitespace-nowrap text-xs">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column} className="py-1.5 text-xs font-mono">
                    {row[column] !== null ? String(row[column]) : <span className="italic text-muted-foreground">NULL</span>}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default ResultsPanel;
