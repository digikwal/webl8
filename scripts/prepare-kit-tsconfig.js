// scripts/prepare-kit-tsconfig.js
import fs from 'fs';
const fallbackPath = './tsconfig.json';

if (!fs.existsSync('./.svelte-kit/tsconfig.json')) {
  const fallback = {
    extends: '@tsconfig/svelte/tsconfig.json',
    include: ['src'],
  };
  fs.writeFileSync(fallbackPath, JSON.stringify(fallback, null, 2));
}
