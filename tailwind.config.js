/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./docs/.vitepress/**/*.vue', './docs/**/*.{vue,md}'],
  theme: {
    extend: {
      colors: {
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff',
      },
      rotate: {
        360: '360deg',
      },
    },
  },
  plugins: [],
}
