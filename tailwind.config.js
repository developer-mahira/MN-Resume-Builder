/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#bbad79',
          light: '#d4cba0',
          dark: '#9a9163',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.2' }],      // 12px mobile
        'sm': ['0.875rem', { lineHeight: '1.4' }],     // 14px tablet  
        'base': ['1rem', { lineHeight: '1.5' }],       // 16px desktop
        'lg': ['1.125rem', { lineHeight: '1.6' }],     // 18px
        'xl': ['1.25rem', { lineHeight: '1.7' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.8' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '1.9' }],    // 30px responsive
        '4xl': ['2.25rem', { lineHeight: '2.0' }],     // 36px large screens
      },
      spacing: {
        '18': '4.5rem',  // A4 margin equivalents
        '72': '18rem',
        '80': '20rem',
        '90': '22.5rem',
      },
      maxWidth: {
        'a4': '210mm',
        'preview-mobile': '95vw',
        'preview-sm': '90vw',
        'preview-md': '80vw',
        'preview-lg': '70vw',
        'preview-xl': '60vw',
      },
      scale: {
        'preview-mobile': '0.65',
        'preview-sm': '0.75',
        'preview-md': '0.85',
        'preview-lg': '0.95',
        'preview-xl': '1.0',
      }
    },
  },
  plugins: [],
}

