# Spektrum Transmitter Configuration Editor

A static web app for editing radio transmitter configurations for Spektrum controllers.

## Features

- Edit model name
- Configure channels (name, type, reverse)
- Set up mixes (from, to, rate)
- Save configurations locally in browser
- Export/import configurations as JSON files

## Development

### Prerequisites

- Node.js (LTS version)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Deployment

This app is configured for deployment to GitHub Pages using GitHub Actions.

1. Push this repository to GitHub.
2. Enable GitHub Pages in the repository settings (deploy from `gh-pages` branch).
3. The app will be automatically built and deployed on pushes to the `main` branch.

If deploying to a subdirectory (e.g., `username.github.io/repo-name`), update `vite.config.ts` with the correct base path:

```ts
export default defineConfig({
  base: '/repo-name/',
  // ...
})
```

## Technologies

- React 19
- TypeScript
- Vite
- ESLint
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
