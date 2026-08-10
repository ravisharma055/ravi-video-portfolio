/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080a',
          900: '#0c0c0f',
          850: '#101013',
          800: '#151518',
          700: '#1d1d21',
          600: '#2a2a2f',
          500: '#3a3a40',
        },
        bone: {
          50: '#f5f5f2',
          100: '#e9e9e4',
          200: '#d4d4cc',
          300: '#b5b5ac',
          400: '#8c8c82',
          500: '#6e6e64',
          600: '#56564e',
        },
        accent: {
          DEFAULT: '#e8553a',
          soft: '#f06a4f',
          deep: '#c43d24',
          muted: '#a8392a',
        },
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 11vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.035em',
        tight: '-0.02em',
        wide: '0.08em',
        widest: '0.2em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1.05)' },
          '50%': { transform: 'translate3d(-1.5%, -2%, 0) scale(1.1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1.2s ease forwards',
        'scale-in': 'scale-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'drift': 'drift 24s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
