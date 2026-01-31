import { minimalSetup, EditorView } from "codemirror";
import { history } from "@codemirror/commands";
import { dictMarkdownLanguage } from "./lang-dictmarkdown";
import { dictMarkdownSyntaxHighlighting } from "./lang-dictmarkdown";
import { operationsPanel } from "./editor-panel";
import { formattingUpdateListener } from "./editor-panel";
import { editorPanelKeymap } from "./editor-panel";
import { highlightActiveLine } from "@codemirror/view";
import { highlightTrailingWhitespace } from "@codemirror/view";

export type DictmarkdownEditor = {
  view: EditorView;
  setText: (text: string) => void;
  getText: () => string;
  destroy: () => void;
};

export type DictmarkdownEditorOptions = {
  initialText?: string;
};

function resolveEditorParent(parent: string | Element): Element {
  if (typeof parent === "string") {
    const parentElement = document.querySelector(parent);
    if (!parentElement) {
      throw new Error(`DictmarkdownEditor: parent element not found for selector "${parent}".`);
    }
    return parentElement;
  }
  return parent;
}

function getText(view: EditorView): string {
  return view.state.doc.toString();
}

function setText(view: EditorView, text: string) {
  const transaction = view.state.update({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: text
    }
  });
  view.dispatch(transaction);
};

export function createDictmarkdownEditor(parent: string | Element, options: DictmarkdownEditorOptions = {}): DictmarkdownEditor {
  const parentElem = resolveEditorParent(parent);
  const view = new EditorView({
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
    parent: parentElem
  });

  if (options.initialText != null) {
    setText(view, options.initialText);
  }

  return {
    view,
    setText: (text) => setText(view, text),
    getText: () => getText(view),
    destroy: () => view.destroy()
  }
}
