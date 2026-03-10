import { useState } from "react";
import { ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface HintDialogProps {
  hints: string[];
}

const HintDialog = ({ hints }: HintDialogProps) => {
  const [revealedCount, setRevealedCount] = useState(0);

  const revealNext = () => {
    if (revealedCount < hints.length) {
      setRevealedCount((count) => count + 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-[1rem] border-border/70 bg-background/70 text-xs">
          <Lightbulb className="h-4 w-4" />
          Tips
          {revealedCount > 0 && (
            <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
              {revealedCount}/{hints.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Tips
          </DialogTitle>
          <DialogDescription>Tips guide your thinking without revealing the full answer.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {hints.slice(0, revealedCount).map((hint, index) => (
            <div
              key={index}
              className="flex gap-2 rounded-[1rem] border border-border/70 bg-muted/70 p-3 text-sm"
            >
              <span className="shrink-0 font-bold text-primary">#{index + 1}</span>
              <span>{hint}</span>
            </div>
          ))}
          {revealedCount === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No tips revealed yet. Click below to unlock the first one.
            </p>
          )}
          {revealedCount < hints.length ? (
            <Button onClick={revealNext} variant="secondary" className="w-full gap-1 rounded-[1rem]">
              <ChevronRight className="h-4 w-4" />
              Reveal Tip #{revealedCount + 1}
            </Button>
          ) : (
            <p className="text-center text-xs text-muted-foreground">All tips revealed. Keep iterating on your query.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HintDialog;
