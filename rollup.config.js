import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "public/dictmarkdown-editor.js",
      format: "iife",
      sourcemap: true,
      name: "DictmarkdownEditor",
    },
  ],
  plugins: [nodeResolve(), typescript()],
};
