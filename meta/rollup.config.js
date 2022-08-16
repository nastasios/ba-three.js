import nodeResolve from "rollup-plugin-node-resolve";

export default {
  input: "js/index.js",
  output: {
    file: "bundle.js",
  },
  plugins: [nodeResolve()],
}
