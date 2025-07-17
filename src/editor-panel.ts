import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { Panel } from "@codemirror/view";
import { SyntaxNode } from "@lezer/common";
import { TransactionSpec } from "@codemirror/state";
import { ViewUpdate } from "@codemirror/view";
import { showPanel } from "@codemirror/view";
import { syntaxTree } from "@codemirror/language";
import {tags as t } from "@lezer/highlight";
import { Tag } from "@lezer/highlight";

type PanelButtonOptions = {
  tag: string;
  iconClassName: string;
  annotationType: AnnotationType;
  action?: (view: EditorView) => void;
};

interface AnnotationType{
  name: string;
  node: Tag;
  markup: string;
}

class AnnotationTypes {
  static readonly Bold: AnnotationType = {name: "Bold", node: t.strong, markup: "**"};
  static readonly Italic: AnnotationType = {name: "Italic", node: t.emphasis, markup: "*"};
  static readonly Reference: AnnotationType = {name: "Ref", node: t.link, markup: "@"};
  static readonly Spaced: AnnotationType = {name: "Spaced", node: t.monospace, markup: "$"};
  static readonly Subscript: AnnotationType = {name: "Subscript", node: t.compareOperator, markup: "_"};
  static readonly Superscript: AnnotationType = {name: "Superscript", node: t.arithmeticOperator, markup: "^"};
}

class CssClasses {
  static readonly PanelButton: string = "dictmarkdown-panel-button";
  static readonly FormatButton: string = "dictmarkdown-formatt-button";
  static readonly ActiveButton: string = "dictmarkdown-button-active";
}

function getSyntaxNodeAtCursor(view: EditorView): SyntaxNode | null {
  const pos = view.state.selection.main.head;
  return syntaxTree(view.state).resolve(pos);
}

function createPanelButton(
  options: PanelButtonOptions,
  view: EditorView,
): Node {
  let button = document.createElement(options.tag);
  button.dataset.annotationTypeName = options.annotationType.name;
  button.className = `${CssClasses.PanelButton} ${CssClasses.FormatButton}`;

  let icon = document.createElement("i");
  icon.className = options.iconClassName ?? "";
  button.appendChild(icon);

  button.addEventListener("click", () => {
    if (options.action) {
      options.action(view);
    }
  });
  return button;
}

function makeAnnotation(view: EditorView, mark: string): void {
  const { state } = view;
  const { from, to } = state.selection.main;
  if (from == to) {
    return;
  }
  view.dispatch({
    changes: {
      from,
      to,
      insert: `${mark}${state.sliceDoc(from, to)}${mark}`,
    },
  });
}

const makeBold = (view: EditorView): void => makeAnnotation(view, AnnotationTypes.Bold.markup);
const makeItalic = (view: EditorView): void => makeAnnotation(view, AnnotationTypes.Italic.markup);
const makeSuperscript = (view: EditorView): void => makeAnnotation(view, AnnotationTypes.Superscript.markup);
const makeSubscript = (view: EditorView): void => makeAnnotation(view, AnnotationTypes.Subscript.markup);
const makeSpaced = (view: EditorView): void => makeAnnotation(view, AnnotationTypes.Spaced.markup);
const makeRef = (view: EditorView): void => makeAnnotation(view, AnnotationTypes.Reference.markup);


function editorPanel(view: EditorView): Panel {
  let dom = document.createElement("div");

  dom.appendChild(createPanelButton({
    iconClassName: "fa fa-bold",
    tag: "a",
    annotationType: AnnotationTypes.Bold,
    action: makeBold
  }, view));
  dom.appendChild(createPanelButton({
    iconClassName: "fa fa-italic",
    tag: "a",
    annotationType: AnnotationTypes.Italic,
    action: makeItalic,
  }, view));
  dom.appendChild(createPanelButton({
    iconClassName: "fa fa-superscript",
    tag: "a",
    annotationType: AnnotationTypes.Superscript,
    action: makeSuperscript
  }, view));
  dom.appendChild(createPanelButton({
    iconClassName: "fa fa-subscript",
    tag: "a",
    annotationType: AnnotationTypes.Subscript,
    action: makeSubscript
  }, view));
  dom.appendChild(createPanelButton({
    iconClassName: "fa fa-object-ungroup",
    tag: "a",
    annotationType: AnnotationTypes.Reference,
    action: makeRef
  }, view));
  dom.appendChild(createPanelButton({
    iconClassName: "fa fa-text-width",
    tag: "a",
    annotationType: AnnotationTypes.Spaced,
    action: makeSpaced
  }, view));

  return {
    dom,
    top: true,
  };
}

function hanleEditorUpdate(update:ViewUpdate){
  if (update.docChanged || update.selectionSet || update.focusChanged || update.viewportChanged) {
    const node = getSyntaxNodeAtCursor(update.view);

    const buttons = document.getElementsByClassName(CssClasses.FormatButton);
    for (const button of buttons) {
      const { annotationTypeName } = (button as HTMLElement).dataset;
      if (node?.type.name == annotationTypeName) {
	button.classList.add(CssClasses.ActiveButton);
      }else{
	button.classList.remove(CssClasses.ActiveButton);
      }
    }
  }
}
export const formattingUpdateListener: Extension = EditorView.updateListener.of(hanleEditorUpdate);
export function operationsPanel() {
  return showPanel.of(editorPanel);
}
