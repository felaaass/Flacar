export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          card: '#102A43',
          deep: '#08131F',
        },
        brand: {
          orange: '#FF6B00',
          orangeHover: '#FF7D1F',
          yellow: '#FFC107',
          muted: '#B8C4D0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px rgba(2, 8, 16, 0.55)',
        hover: '0 22px 48px rgba(2, 8, 16, 0.7), 0 0 28px rgba(255, 107, 0, 0.18)',
        orange: '0 8px 20px rgba(255, 107, 0, 0.35)',
        orangeLg: '0 12px 28px rgba(255, 107, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
