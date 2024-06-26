const base = require('@dragverse/ui/tailwind-preset')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{ts,tsx}'
  ],
  plugins: [require('@tailwindcss/aspect-ratio')]
}
