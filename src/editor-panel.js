import { showPanel } from "@codemirror/view";

function createPanelButton(options, view) {
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

function makeBold(view) {
  const { state } = view;
  const { from, to } = state.selection.main;
  if (from == to) {
    console.debug("[makeBold]: No text selected.");
    return;
  }
  view.dispatch({
    changes: {
      from,
      to,
      insert: `**${state.sliceDoc(from, to)}**`,
    },
  });
}
function editorPanel(view) {
  let dom = document.createElement("div");

  dom.appendChild(
    createPanelButton({ iconClassName: "fa fa-bold", action: makeBold }, view),
  );
  dom.appendChild(createPanelButton({ iconClassName: "fa fa-italic" }));
  dom.appendChild(createPanelButton({ iconClassName: "fa fa-superscript" }));
  dom.appendChild(createPanelButton({ iconClassName: "fa fa-subscript" }));
  dom.appendChild(createPanelButton({ iconClassName: "fa fa-object-ungroup" }));
  dom.appendChild(createPanelButton({ iconClassName: "fa fa-text-width" }));
  return {
    dom,
    top: true,
  };
}

export function operationsPanel() {
  return showPanel.of(editorPanel);
}
