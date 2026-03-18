/// <reference types="node" />
import { bundle } from './index.js';

const args = process.argv.slice(2);
const src = args[args.indexOf('--src') + 1];
const out = args[args.indexOf('--out') + 1];

if (!src || !out) {
  console.error('Usage: vendrop --src <input> --out <output>');
  process.exit(1);
}

await bundle({ src, out });
