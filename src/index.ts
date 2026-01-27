import { minimalSetup, EditorView } from "codemirror";
import { history } from "@codemirror/commands";
import { dictMarkdownLanguage } from "./lang-dictmarkdown";
import { dictMarkdownSyntaxHighlighting } from "./lang-dictmarkdown";
import { operationsPanel } from "./editor-panel";
import { formattingUpdateListener } from "./editor-panel";
import { editorPanelKeymap } from "./editor-panel";
import { highlightActiveLine } from "@codemirror/view";
import { highlightTrailingWhitespace } from "@codemirror/view";

const targetElement: any = document.querySelector("#editor");
export const editor = new EditorView({
  extensions: [
    minimalSetup,
    dictMarkdownLanguage,
    dictMarkdownSyntaxHighlighting,
    history(),
    operationsPanel(),
    EditorView.lineWrapping,
    formattingUpdateListener,
    editorPanelKeymap,
    highlightActiveLine(),
    highlightTrailingWhitespace()
  ],
  parent: targetElement
});


export function setEditorText(text: string) {
  const transaction = editor.state.update({
    changes: {
      from: 0,
      to: editor.state.doc.length,
      insert: text
    }
  });
  editor.dispatch(transaction);
};

export function getEditorText() {
  return editor.state.doc.toString();
}
