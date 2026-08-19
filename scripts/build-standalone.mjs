/* Build a single self-contained HTML file (all CSS/JS/data inlined) from the
 * source in index.html + assets/, so it can be dropped onto Netlify Drop with
 * no build step. Run: node scripts/build-standalone.mjs                        */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let html   = readFileSync(join(root, 'index.html'), 'utf8');
const css  = readFileSync(join(root, 'assets/styles.css'), 'utf8');
let data   = readFileSync(join(root, 'assets/data.js'), 'utf8');
let app    = readFileSync(join(root, 'assets/app.js'), 'utf8');
const svg  = readFileSync(join(root, 'assets/favicon.svg'), 'utf8');

// ES modules -> one classic script.
data = data.replace(/^export\s+/gm, '');
app  = app.replace(/^import\s+\{[\s\S]*?\}\s+from\s+'\.\/data\.js';\s*$/m, '/* data.js inlined above */');

const favData = 'data:image/svg+xml;base64,' + Buffer.from(svg).toString('base64');

html = html
  .replace('<link rel="stylesheet" href="assets/styles.css" />', `<style>\n${css}\n</style>`)
  .replace('<link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />',
           `<link rel="icon" href="${favData}" type="image/svg+xml" />`)
  .replace('<script type="module" src="assets/app.js"></script>',
           `<script>\n/* ===== data ===== */\n${data}\n/* ===== app ===== */\n${app}\n</script>`);

const out = join(root, 'thai-audio-p2-tracker.html');
writeFileSync(out, html);
console.log('wrote', out, '(' + Math.round(html.length / 1024) + ' KB)');
