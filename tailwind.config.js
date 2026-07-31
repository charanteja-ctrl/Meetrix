/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f0ff',
          100: '#e1e0ff',
          500: '#6c63ff',
          600: '#584ee4',
          700: '#4337cb',
        },
        surface: {
          DEFAULT: '#0d0e12',
          card: '#14161d',
          cardHover: '#1c1f29',
          border: 'rgba(255, 255, 255, 0.08)',
          light: '#f8fafc',
          lightCard: '#ffffff',
          lightBorder: 'rgba(0, 0, 0, 0.08)'
        },
        accent: {
          mint: '#00E5A8',
          pink: '#FF5A76',
          amber: '#FFB84D',
          cyan: '#00D8F6',
          purple: '#9D4EDD'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 15s ease infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      }
    },
  },
  plugins: [],
}
