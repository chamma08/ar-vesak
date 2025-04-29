/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c1e8ef36",
        secondary: "#43c2d1",
        tertiary: "#272626",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      backgroundImage: {
        hero: "url(/src/assets/3.jpg)",
        banner: "url(/src/assets/4.jpg)",
        rc: "url(/src/assets/rc.jpg)",
        cb: "url(/src/assets/cb.jpg)",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(99, 102, 241, 0.4)',
      },
    },
  },
  plugins: [],
}