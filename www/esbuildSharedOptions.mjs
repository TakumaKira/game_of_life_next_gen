import { env } from "@dotenv-run/core";
import wasmPlugin from './wasmPlugin.mjs'

const { full } = env({
  files: [".env"],
});

const esbuildSharedOption = {
  entryPoints: ['./src/index.jsx'],
  bundle: true,
  outfile: './public/bundle/index.js',
  tsconfig: './tsconfig.json',
  plugins: [
    wasmPlugin,
  ],
  define: full,
}
export default esbuildSharedOption
