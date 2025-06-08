// scripts/prepare-kit-tsconfig.js
import fs from 'fs';
import path from 'path';

const kitConfigPath = path.resolve('.svelte-kit/tsconfig.json');
const localTsconfigPath = path.resolve('tsconfig.json');

const fallback = {
  extends: '@tsconfig/svelte/tsconfig.json',
  compilerOptions: {
    target: 'ES2023',
    lib: ['ES2023', 'DOM'],
    strict: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    isolatedModules: true,
    noEmit: true,
    skipLibCheck: true,
    allowJs: true,
    checkJs: false,
    types: ['svelte', 'vite/client'],
  },
  include: ['src'],
  exclude: ['node_modules', 'dist', 'build'],
};

if (!fs.existsSync(kitConfigPath)) {
  console.warn('[webl8] No .svelte-kit/tsconfig.json found. Writing fallback tsconfig.json...');
  fs.writeFileSync(localTsconfigPath, JSON.stringify(fallback, null, 2) + '\n');
} else {
  console.log('[webl8] .svelte-kit/tsconfig.json detected. Skipping fallback.');
}
