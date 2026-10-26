/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#07090E',
          900: '#0B0F19',
          850: '#101522',
          800: '#161D2E',
          750: '#1C253B',
          700: '#26334D',
          600: '#384869',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        lime: {
          DEFAULT: '#D4FF00',
          neon: '#D4FF00',
          hover: '#C2EB00',
          muted: '#A3CC00',
          glow: 'rgba(212, 255, 0, 0.25)',
        },
        ember: {
          DEFAULT: '#FF5C00',
          hover: '#E65300',
          muted: '#C94900',
          glow: 'rgba(255, 92, 0, 0.25)',
        },
        steel: {
          DEFAULT: '#38BDF8',
          muted: '#0284C7',
        },
        signal: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#F43F5E',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        display: ['Space Grotesk', 'Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'titanium': '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'titanium-hover': '0 16px 40px -5px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(212, 255, 0, 0.35)',
        'lime-tactile': '0 4px 0 #9EBF00, 0 8px 20px rgba(212, 255, 0, 0.25)',
        'ember-tactile': '0 4px 0 #B84300, 0 8px 20px rgba(255, 92, 0, 0.25)',
        'subtle-elevation': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
