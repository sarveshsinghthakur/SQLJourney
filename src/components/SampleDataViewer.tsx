import type { TableSchema } from "@/data/mockData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SampleDataViewerProps {
  tables: TableSchema[];
}

const SampleDataViewer = ({ tables }: SampleDataViewerProps) => {
  return (
    <Tabs defaultValue={tables[0]?.name} className="flex h-full flex-col p-2">
      <TabsList className="w-full justify-start overflow-x-auto bg-muted/60 px-1">
        {tables.map((table) => (
          <TabsTrigger key={table.name} value={table.name} className="text-xs">
            {table.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tables.map((table) => (
        <TabsContent key={table.name} value={table.name} className="mt-2 flex-1 overflow-hidden">
          <ScrollArea className="h-full rounded-[1rem] border border-border/70 bg-background/70">
            <div className="p-2">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Schema: {table.columns.map((column) => `${column.name} (${column.type})`).join(", ")}
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    {table.columns.map((column) => (
                      <TableHead key={column.name} className="h-9 whitespace-nowrap text-xs">
                        {column.name}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.sampleData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {table.columns.map((column) => (
                        <TableCell key={column.name} className="py-1.5 text-xs">
                          {row[column.name] !== null ? (
                            String(row[column.name])
                          ) : (
                            <span className="italic text-muted-foreground">NULL</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default SampleDataViewer;
