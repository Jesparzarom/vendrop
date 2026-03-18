# vendrop

Minify and copy vendor JS dependencies to your public folder.  
Works with Vite, Astro, and any Node project.

## Install
```bash
pnpm add -D vendrop
```

## Vite / Astro
```js
import { vendropVite } from 'vendrop'

export default defineConfig({
  plugins: [
    vendropVite([
      { src: 'node_modules/flyonui/flyonui.js', out: 'public/vendor/flyonui/flyonui.min.js' }
    ])
  ]
})
```

## CLI
```bash
vendrop --src node_modules/flyonui/flyonui.js --out public/vendor/flyonui/flyonui.min.js
```

## Standalone
```js
import { bundle } from 'vendrop'

await bundle({ src: 'node_modules/flyonui/flyonui.js', out: 'public/vendor/flyonui/flyonui.min.js' })
```