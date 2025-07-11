import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "public/bundle.js",
      format: "iife",
      sourcemap: true,
    },
  ],
  plugins: [nodeResolve(), typescript()],
};
