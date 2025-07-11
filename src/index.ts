import { minimalSetup, EditorView } from "codemirror";
import { history } from "@codemirror/commands";
import { dictMarkdownLanguage } from "./lang-dictmarkdown";
import { dictMarkdownSyntaxHighlighting } from "./lang-dictmarkdown";
import { operationsPanel } from "./editor-panel";


const initialText = `**Z** s. m. invar. A treizeci şi una^1^, respectiv ultima_2_ literă a
alfabetului limbii române, şi sunetul corespunzător (consoană
fricativă, dentală, sonoră). @Cf. DDRF, ŞĂINEANU^2^, RESMERIŢĂ, D.,
CADE.@ *Sunt risipiţi … pe toată întinderea alfabetului, de la „a“
până la „zed“.* @VINEA, L. I, 137, cf. DL, DM, DER.@ *A fost dezolat
într-o zi când i se atrăsese atenţia despre o altă literă că este
„zet“.* @ROMÂNIA LITERARĂ, 1970, nr. 72, 183, cf. M. D. ENC., DEX.@
**◊** $Loc. adj. şi adv.$ **De la A la Z(ed)** (care este) de la un
capăt la altul. @Cf. DEX.@
- Pronunţat: *ze* şi (în expresii) *zet*, (ieşit din uz) *zed.*
`;

const targetElement:any = document.querySelector("#editor");
new EditorView({
  doc: initialText,
  extensions: [
    minimalSetup,
    dictMarkdownLanguage,
    dictMarkdownSyntaxHighlighting,
    history(),
    operationsPanel(),
    EditorView.lineWrapping,
  ],
  parent: targetElement
});
