#!/usr/bin/env node
const { spawn } = require('child_process');

const port = process.env.PORT || process.env.port || 5000;
const candidates = [
  'serve/build/main.js', // current versions
  'serve/bin/serve' // older versions
];

let serveBin = null;
for (const c of candidates) {
  try {
    serveBin = require.resolve(c);
    break;
  } catch (e) {
    // continue
  }
}

if (!serveBin) {
  console.error('`serve` is not installed or an unexpected version is present. Run `npm install` to install dependencies.');
  process.exit(1);
}

const child = spawn(process.execPath, [serveBin, '-s', 'dist', '-l', `tcp:${port}`], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
