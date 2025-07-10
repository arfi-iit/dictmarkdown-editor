import { showPanel } from "@codemirror/view";

function createPanelButton(options) {
  let button = document.createElement(options.tag ?? "a");
  let icon = document.createElement("i");
  icon.className = options.iconClassName ?? "";
  button.appendChild(icon);
  button.className = "editor-panel-button";
  return button;
}

function editorPanel(view) {
  let dom = document.createElement("div");

  dom.appendChild(createPanelButton({ iconClassName: "fa fa-bold" }));
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
