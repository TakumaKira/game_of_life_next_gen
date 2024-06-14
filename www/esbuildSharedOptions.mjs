import { env } from "@dotenv-run/core";
import wasmPlugin from './wasmPlugin.mjs'
import svgr from 'esbuild-plugin-svgr'
import ttfLoaderPlugin from './ttfLoaderPlugin.mjs'

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
    svgr(),
    ttfLoaderPlugin,
  ],
  define: full,
}
export default esbuildSharedOption
