/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'], // Primary font - replaces default sans
        'display': ['ITC Garamond', 'Times New Roman', 'serif'], // Secondary/Display font
        'serif': ['ITC Garamond', 'Times New Roman', 'serif'], // Also replaces default serif
      },
    },
  },
  plugins: [],
}