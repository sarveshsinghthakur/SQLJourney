import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
}

const SqlEditor = ({ value, onChange, onRun }: SqlEditorProps) => {
  const [theme, setTheme] = useState<"vs" | "vs-dark">("vs");

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setTheme(root.classList.contains("dark") ? "vs-dark" : "vs");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <Editor
      height="100%"
      defaultLanguage="sql"
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? "")}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        padding: { top: 10 },
        smoothScrolling: true,
        suggest: {
          showKeywords: true,
        },
      }}
      onMount={(editor) => {
        editor.addAction({
          id: "run-query",
          label: "Run Query",
          keybindings: [2048 | 3],
          run: () => onRun(),
        });
      }}
    />
  );
};

export default SqlEditor;
