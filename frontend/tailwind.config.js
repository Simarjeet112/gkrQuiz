/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        arena: {
          bg: '#05070B',
          surface: '#0B0F19',
          card: '#101626',
          cardHover: '#161F36',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(0, 240, 255, 0.4)',
          violet: '#8B5CF6',
          violetLight: '#A78BFA',
          violetDark: '#6D28D9',
          green: '#10B981',
          greenNeon: '#00FF88',
          cyan: '#00F0FF',
          cyanLight: '#38BDF8',
          cyanDark: '#0891B2',
          orange: '#FF6B00',
          orangeNeon: '#FF8800',
          amber: '#F59E0B',
          red: '#EF4444',
          crimson: '#FF0055',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 240, 255, 0.45)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.45)',
        'glow-green': '0 0 25px -4px rgba(0, 255, 136, 0.45)',
        'glow-orange': '0 0 25px -4px rgba(255, 107, 0, 0.45)',
        'glow-crimson': '0 0 28px -4px rgba(255, 0, 85, 0.55)',
        'hud': '0 0 15px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
        scan: 'scan 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
