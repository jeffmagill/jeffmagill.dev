#!/usr/bin/env node
const { spawn } = require('child_process');

// Message substring to filter from Vitest/Vite output
const FILTER = "The CJS build of Vite's Node API is deprecated";

const args = process.argv.slice(2);
// Prefer local binary if available
const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const cp = spawn(cmd, ['vitest', ...args], { stdio: ['inherit', 'pipe', 'pipe'] });

function filterAndPrint(stream, dest) {
  stream.on('data', (chunk) => {
    const text = String(chunk);
    const lines = text.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      if (line.includes(FILTER)) continue;
      dest.write(line + '\n');
    }
  });
}

filterAndPrint(cp.stdout, process.stdout);
filterAndPrint(cp.stderr, process.stderr);

cp.on('close', (code) => {
  process.exit(code);
});
