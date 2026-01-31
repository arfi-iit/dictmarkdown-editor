import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const plugins = [nodeResolve(), typescript()];

export default [
  {
    input: "src/index.ts",
    output: {
      file: "public/dictmarkdown-editor.iffe.js",
      format: "iife",
      sourcemap: true,
      name: "DictmarkdownEditor",
    },
    plugins: plugins,
  },
  {
    input: "src/index.ts",
    output: {
      file: "public/dictmarkdown-editor.esm.js",
      format: "es",
      sourcemap: true,
    },
    plugins: plugins,
  },
];
