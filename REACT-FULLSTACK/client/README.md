

# React + TypeScript + Vite

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

## Running the Project

To run your project locally with Vite, use the following command:

```bash
npm run dev
```

This will start the development server and open the app in your default browser. Vite provides fast Hot Module Replacement (HMR) to reflect changes immediately.

