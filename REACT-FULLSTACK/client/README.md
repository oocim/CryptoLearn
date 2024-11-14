
# React + TypeScript + Vite

## Installation

Follow these steps to install the required dependencies:

1. **Navigate to the project folder** (if you're not already inside):

   ```bash
   cd path/to/your-cloned-project
   ```

2. **Install core dependencies** for the project:

   ```bash
   npm install react-router-dom lucide-react framer-motion @radix-ui/react-tabs @radix-ui/react-slot class-variance-authority clsx tailwind-merge
   ```

3. **Install Tailwind CSS and PostCSS dependencies**:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

4. **Install remaining dependencies** (such as ESLint and other tools):

   ```bash
   npm install
   ```

## Tailwind Setup

If the project doesn't already have Tailwind configured, follow these steps:

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

To run the project locally with Vite, use the following command:

```bash
npm run dev
```

This will start the development server and open the app in your default browser. Vite provides fast Hot Module Replacement (HMR) to reflect changes immediately.
