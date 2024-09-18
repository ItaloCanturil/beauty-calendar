/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['.src/**/*.{vue,js,ts,jsx,tsx}',
    "./presets/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

