import { parser } from "@arfi-iit/lezer-dictmarkdown";
import { syntaxHighlighting } from "@codemirror/language";
import { HighlightStyle } from "@codemirror/language";
import { LRLanguage } from "@codemirror/language";
import { LanguageSupport } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

export const dictMarkdownSyntaxHighlighting = syntaxHighlighting(
  HighlightStyle.define([
    {
      tag: t.content,
    },
    {
      tag: t.strong,
      fontWeight: "bold",
    },
    {
      tag: t.emphasis,
      fontStyle: "italic",
    },
    {
      tag: t.link,
      color: "#d5465c",
      fontVariant: "small-caps",
    },
    {
      tag: t.monospace,
      letterSpacing: "3px",
      color: "#347395",
    },
    {
      tag: t.compareOperator,
      verticalAlign: "sub",
      fontSize: "small",
      color: "#006d91",
    },
    {
      tag: t.arithmeticOperator,
      verticalAlign: "super",
      fontSize: "small",
      color: "#006d91",
    },
  ]),
);

export const dictMarkdownLanguage = LRLanguage.define({
  name: "dictmarkdown",
  parser: parser.configure({
    props: [],
  }),
});

export function dictMarkdown() {
  return new LanguageSupport(dictMarkdownLanguage);
}
