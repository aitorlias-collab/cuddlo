import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:   '#F5EFE6',
        sand:    '#C4A882',
        brown:   '#8B5E3C',
        lavender:'#EEEDFE',
        ink:     '#2C1810',
      },
      fontFamily: {
        sans:  ['var(--font-inter)',   'Inter',        'sans-serif'],
        serif: ['var(--font-bodoni)',  'Bodoni Moda',  'serif'],
      },
    },
  },
  plugins: [],
}
export default config
