/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neumorphic color palette with soft light gray background
        'neu-base': '#e0e0e0',
        'neu-light': '#ffffff',
        'neu-dark': '#a8a8a8',
        'neu-shadow-light': '#ffffff80',
        'neu-shadow-dark': '#bebebe80',
        // Professional futuristic accent colors
        'accent-primary': '#667eea',
        'accent-secondary': '#764ba2',
        'accent-success': '#10b981',
        'accent-warning': '#f59e0b',
        'accent-danger': '#ef4444',
        'accent-info': '#3b82f6',
      },
      fontFamily: {
        'futuristic': ['Orbitron', 'Exo 2', 'sans-serif'],
      },
      boxShadow: {
        // Neumorphic shadows - dual light and dark shadows
        'neu-flat': '0 0 0 1px rgba(255,255,255,0.05), 0 1px 3px rgba(0,0,0,0.1)',
        'neu-pressed': 'inset 2px 2px 4px rgba(190,190,190,0.7), inset -2px -2px 4px rgba(255,255,255,0.9)',
        'neu-raised': '4px 4px 8px rgba(190,190,190,0.7), -4px -4px 8px rgba(255,255,255,0.9)',
        'neu-hover': '6px 6px 12px rgba(190,190,190,0.8), -6px -6px 12px rgba(255,255,255,1)',
        'neu-active': 'inset 3px 3px 6px rgba(190,190,190,0.8), inset -3px -3px 6px rgba(255,255,255,1)',
        'neu-glow': '0 0 20px rgba(102, 126, 234, 0.3), 4px 4px 8px rgba(190,190,190,0.7), -4px -4px 8px rgba(255,255,255,0.9)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.3), 4px 4px 8px rgba(190,190,190,0.7), -4px -4px 8px rgba(255,255,255,0.9)' },
          '100%': { boxShadow: '0 0 30px rgba(102, 126, 234, 0.5), 4px 4px 8px rgba(190,190,190,0.7), -4px -4px 8px rgba(255,255,255,0.9)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}