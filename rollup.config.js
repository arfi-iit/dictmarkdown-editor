// const commonjs = require("@rollup/plugin-commonjs");
// const resolve = require("@rollup/plugin-node-resolve");
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
    resolve(), // tells Rollup how to find modules in node_modules
    // commonjs(), // convertscommonJS modules to ES modules
  ],
};
