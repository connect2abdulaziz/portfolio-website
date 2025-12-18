/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-source-code-pro)', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        'source-code-pro': ['var(--font-source-code-pro)', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        DEFAULT: 'var(--line-color)',
        dark: 'var(--line-color)',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
