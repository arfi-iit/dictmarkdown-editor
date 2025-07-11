import { showPanel } from "@codemirror/view";
import { EditorView } from "@codemirror/view";
import { Panel } from "@codemirror/view";


function createPanelButton(options: any, view: EditorView): Node {
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

function makeBold(view: EditorView) {
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
function editorPanel(view: EditorView): Panel {
	let dom = document.createElement("div");

	dom.appendChild(
		createPanelButton({ iconClassName: "fa fa-bold", action: makeBold }, view),
	);
	dom.appendChild(createPanelButton({ iconClassName: "fa fa-italic" }, view));
	dom.appendChild(createPanelButton({ iconClassName: "fa fa-superscript" }, view));
	dom.appendChild(createPanelButton({ iconClassName: "fa fa-subscript" }, view));
	dom.appendChild(createPanelButton({ iconClassName: "fa fa-object-ungroup" }, view));
	dom.appendChild(createPanelButton({ iconClassName: "fa fa-text-width" }, view));
	return {
		dom,
		top: true,
	};
}

export function operationsPanel() {
	return showPanel.of(editorPanel);
}
