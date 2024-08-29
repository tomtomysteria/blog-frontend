import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#4F46E5', // Exemples de couleurs personnalisées
        secondary: '#EC4899',
        foreground: 'rgb(var(--foreground-rgb))',
        backgroundStart: 'rgb(var(--background-start-rgb))',
        backgroundEnd: 'rgb(var(--background-end-rgb))',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Ajout d'une police personnalisée
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin pour styliser les formulaires
    require('@tailwindcss/typography'), // Plugin pour la typographie
  ],
};

export default config;
