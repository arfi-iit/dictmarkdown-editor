import { showPanel } from "@codemirror/view";
import { EditorView } from "@codemirror/view";
import { Panel } from "@codemirror/view";

type PanelButtonOptions = {
  tag?: string;
  iconClassName?: string;
  action?: (view: EditorView) => void;
};

function createPanelButton(
  options: PanelButtonOptions,
  view: EditorView,
): Node {
  let button = document.createElement(options.tag ?? "a");
  let icon = document.createElement("i");
  icon.className = options.iconClassName ?? "";
  button.appendChild(icon);
  button.className = "editor-panel-button";
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

const makeBold = (view: EditorView): void => makeAnnotation(view, "**");
const makeItalic = (view: EditorView): void => makeAnnotation(view, "*");
const makeSuperscript = (view: EditorView): void => makeAnnotation(view, "^");
const makeSubscript = (view: EditorView): void => makeAnnotation(view, "_");
const makeSpaced = (view: EditorView): void => makeAnnotation(view, "$");
const makeRef = (view: EditorView): void => makeAnnotation(view, "@");

function editorPanel(view: EditorView): Panel {
  let dom = document.createElement("div");
  dom.appendChild(
    createPanelButton({ iconClassName: "fa fa-bold", action: makeBold }, view),
  );
  dom.appendChild(
    createPanelButton(
      { iconClassName: "fa fa-italic", action: makeItalic },
      view,
    ),
  );
  dom.appendChild(
    createPanelButton(
      { iconClassName: "fa fa-superscript", action: makeSuperscript },
      view,
    ),
  );
  dom.appendChild(
    createPanelButton(
      { iconClassName: "fa fa-subscript", action: makeSubscript },
      view,
    ),
  );
  dom.appendChild(
    createPanelButton(
      { iconClassName: "fa fa-object-ungroup", action: makeRef },
      view,
    ),
  );
  dom.appendChild(
    createPanelButton(
      { iconClassName: "fa fa-text-width", action: makeSpaced },
      view,
    ),
  );
  return {
    dom,
    top: true,
  };
}

export function operationsPanel() {
  return showPanel.of(editorPanel);
}
