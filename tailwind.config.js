/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#ff55a5',
          600: '#ff5860',
        },
        gray: {
          800: '#2b2b31',
          400: '#b0b0b5',
          900: '#212529',
        },
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      fontSize: {
        'custom-title': ['2.50rem', '2.25rem'],
      },
      spacing: {
        'title-offset': '7rem',
        'breadcrumb-offset': '10rem',
        'side-padding': '5%',
      },
      maxWidth: {
        'custom-max': '100%',
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'width': 'width',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
        'in-out-expo': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      transitionDuration: {
        '500': '500ms',
        '400': '400ms',
        '600': '600ms',
      },
      transitionDelay: {
        '200': '200ms',
        '400': '400ms',
      },
      backgroundImage: {
        'gradient-pink': 'linear-gradient(90deg, #ff5860 0%, #ff55a5 100%)',
      },
      boxShadow: {
        'custom-pink': '0 0 16px 0 rgba(255, 88, 96, 0.3)',
      },
      opacity: {
        '5': '0.05',
      },
    },
  },
  plugins: [],
}
