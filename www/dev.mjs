#!/usr/bin/env node
import * as esbuild from 'esbuild'
import esbuildSharedOption from './esbuildSharedOptions.mjs'

const ctx = await esbuild.context(esbuildSharedOption)

const { host, port } = await ctx.serve({
  servedir: 'public',
  onRequest: () => {
    console.log('Got request')
  },
})
console.log(`http://${host}:${port}`)
