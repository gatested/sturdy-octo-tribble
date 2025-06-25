/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false, // <--- esto evita que Tailwind sobrescriba estilos base
  },
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'sans-serif'],
        geistMono: ['var(--font-geist-mono)', 'monospace'],
        island: ['var(--font-island-moments)', 'cursive'],
        kapakana: ['Kapakana', 'cursive'],
      },
    },
  },
  plugins: [],
};
