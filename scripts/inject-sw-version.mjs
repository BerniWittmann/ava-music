import { readFileSync, writeFileSync } from 'fs';

const buildId = readFileSync('.next/BUILD_ID', 'utf8').trim();
const swPath = 'out/sw.js';

let sw = readFileSync(swPath, 'utf8');
sw = sw.replace("'dev'", `'${buildId}'`);
writeFileSync(swPath, sw);

console.log(`[sw] Injected build ID ${buildId} into sw.js`);
