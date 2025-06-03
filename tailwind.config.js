// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
      extend: {
        keyframes: {
          // 1) Gradient shift left→right→left over 15s
          techGradient: {
            '0%':   { 'background-position': '0% 50%' },
            '50%':  { 'background-position': '100% 50%' },
            '100%': { 'background-position': '0% 50%' },
          },
          // 2) Float shapes: drift up & right at 50%, fade in/out
          floatShape: {
            '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0' },
            '50%':      { transform: 'translateY(-20px) translateX(10px) scale(1.05)', opacity: '0.3' },
          },
        },
        animation: {
          // Apply gradient shift
          'tech-gradient': 'techGradient 15s ease infinite',
          // Apply floating motion (8s loop)
          'float-shape':   'floatShape 8s ease-in-out infinite',
        },
        backgroundImage: {
          // 5-stop “tech” gradient similar to many modern UIs
          'tech-gradient': 'linear-gradient(270deg, #0F172A, #1E3A8A, #4F46E5, #7C3AED, #0F172A)',
        },
        backgroundSize: {
          'tech-large': '1000% 1000%', // so the gradient can move visibly
        },
      },
    },
    plugins: [],
  };
  