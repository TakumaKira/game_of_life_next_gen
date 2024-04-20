#!/usr/bin/env node
import * as esbuild from 'esbuild'
import wasmPlugin from './wasmPlugin.mjs'

await esbuild.build({
  entryPoints: ['./src/index.jsx'],
  bundle: true,
  outfile: './public/bundle/index.js',
  plugins: [wasmPlugin],
})
