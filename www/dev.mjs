#!/usr/bin/env node
import * as esbuild from 'esbuild'
import wasmPlugin from './wasmPlugin.mjs'

const ctx = await esbuild.context({
  entryPoints: ['./src/index.jsx'],
  bundle: true,
  outfile: './public/bundle/index.js',
  plugins: [wasmPlugin],
})

const { host, port } = await ctx.serve({
  servedir: 'public',
  onRequest: () => {
    console.log('Got request')
  },
})
console.log(`http://${host}:${port}`)
