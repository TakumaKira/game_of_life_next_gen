#!/usr/bin/env node
import * as esbuild from 'esbuild'
import esbuildSharedOption from './esbuildSharedOptions.mjs'

await esbuild.build(esbuildSharedOption)
