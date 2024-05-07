"use client";

import React, { useEffect } from "react";
import { editor, languages } from "monaco-editor";

// set these early on so that initial variables with comments don't flash an error
languages.json.jsonDefaults.setDiagnosticsOptions({
  allowComments: true,
  trailingCommas: "ignore",
});

const createEditor = (
  ref: React.MutableRefObject<null>,
  options: editor.IStandaloneEditorConstructionOptions
) => editor.create(ref.current as unknown as HTMLElement, options);

function Editor({ lang }) {
  const opsRef = React.useRef(null);
  const [queryEditor, setQueryEditor] =
    React.useState<editor.IStandaloneCodeEditor | null>(null);

  /**
   * Create the models & editors
   */
  useEffect(() => {
    let monacoEditor: any;
    if (!queryEditor) {
      monacoEditor = createEditor(opsRef, {
        theme: "vs-dark",
        language: lang,
      });
      setQueryEditor(monacoEditor);
    }
    return () => {
      const editorModel = monacoEditor?.getModel();
      if (editorModel) {
        editorModel.dispose();
      }
      queryEditor?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run once on mount
  }, [lang]);

  return (
    <div
      key={lang}
      style={{ height: "100vh" }}
      ref={opsRef}
      className="editor"
    />
  );
}

export default function Home() {
  const [lang, setLang] = React.useState("groovy");
  const [c, setC] = React.useState(0);
  console.log(c);
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <select
        value={lang}
        onChange={(e) => {
          setC(c + 1);
          setLang(e.target.value);
        }}
      >
        <option value="json">JSON</option>
        <option value="groovy">Groovy</option>
      </select>
      <Editor key={c} lang={lang} />
    </div>
  );
}
