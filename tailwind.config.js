module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        primary: "#4B0082",
        secondary: "#F4DECB",
        tertiary: "#FFD700",
        textColor: "#1A1A1A"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
