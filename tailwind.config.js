/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroonBg: '#360203', // Deep Maroon (Background)
        maroonDark: '#270101', // Dark Maroon (Shadow)
        maroon: '#4A0F1B', // Deep Maroon
        maroonAlt: '#611827', // Deep Maroon
        ivory: '#F9F7F3', // Premium White
        charcoal: '#222222', // Charcoal
        gold: '#CD9F49', // Old Gold (Main Logo)
        goldDark: '#AC7A2F', // Dark Gold (edges / shadow)
        goldLight: '#E1BF6F', // Light Gold (highlights)
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(205,159,73,0.35), 0 18px 45px -20px rgba(205,159,73,0.55)',
        goldSoft: '0 10px 40px -15px rgba(205,159,73,0.45)',
        deep: '0 30px 60px -30px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #AC7A2F 0%, #E1BF6F 45%, #CD9F49 70%, #AC7A2F 100%)',
        'maroon-fade': 'linear-gradient(180deg, #270101 0%, #360203 45%, #4A0F1B 100%)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
