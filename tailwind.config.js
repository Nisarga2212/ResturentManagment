module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        gradient: "gradient 12s ease infinite",
        "fade-in": "fadeIn 1.2s ease forwards",
        "slide-up": "slideUp 1s ease forwards",
      },
      backgroundSize: {
        "400%": "400% 400%", // helps with animated gradients
      },
    },
  },
  plugins: [],
};
