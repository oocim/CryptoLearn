

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation

Follow these steps to set up the project:

1. **Create a new Vite project** with the React and TypeScript template:

   ```bash
   npm create vite@latest client -- --template react-ts
   ```

2. **Navigate to the project folder**:

   ```bash
   cd client
   ```

3. **Install required dependencies** for React Router, animations, UI components, and utilities:

   ```bash
   npm install react-router-dom lucide-react framer-motion @radix-ui/react-tabs @radix-ui/react-slot class-variance-authority clsx tailwind-merge
   ```

4. **Install Tailwind CSS and PostCSS dependencies**:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

5. **Install the remaining dependencies**:

   ```bash
   npm install
   ```

## Tailwind Setup

To configure Tailwind CSS, follow these steps:

1. **Generate Tailwind config files**:

   ```bash
   npx tailwindcss init -p
   ```

2. **Configure Tailwind in your `tailwind.config.js`**:

   Edit your `tailwind.config.js` to include the necessary file paths:

   ```js
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. **Add Tailwind directives to your CSS file** (e.g., `src/index.css`):

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Ensure your CSS file is imported** in the entry file (`src/main.tsx`):

   ```tsx
   import './index.css';
   ```

## ESLint Setup

If you are developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules.

1. **Install `eslint-plugin-react`** if you haven’t already:

   ```bash
   npm install eslint-plugin-react
   ```

2. **Modify the ESLint config** to enable TypeScript and React linting:

   ```js
   import react from 'eslint-plugin-react';

   export default tseslint.config({
     // Set the react version
     settings: { react: { version: '18.3' } },
     plugins: {
       // Add the react plugin
       react,
     },
     rules: {
       // other rules...
       // Enable its recommended rules
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```

3. **Enable type-aware linting**:

   Update the `parserOptions` in your ESLint configuration like this:

   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

4. **Set ESLint to use stricter TypeScript rules**:

   - Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
   - Optionally, add `tseslint.configs.stylisticTypeChecked` for additional stylistic rules.

## Running the Project

To run your project locally with Vite, use the following command:

```bash
npm run dev
```

This will start the development server and open the app in your default browser. Vite provides fast Hot Module Replacement (HMR) to reflect changes immediately.

