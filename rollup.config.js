import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/server/index.ts",

  output: {
    dir: "dist/server",
    minifyInternalExports: true,
  },
  plugins: [
    typescript({
      rootDir: "src",
      module: "esnext",
      tsconfig: "./tsconfig.server.json",
    }),
    terser({
      compress: {
        defaults: false,
        booleans_as_integers: true,
      },
    }),
  ],
};
export default config;
