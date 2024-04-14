#!/usr/bin/env node
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/index.jsx'],
  bundle: true,
  outfile: './public/bundle/index.js',
})
