import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        '100': '100%', // Changed to percentage for responsiveness
        '400px': '400px', // Adding a pixel-based width for fixed width elements
      },
      height: {
        '100': '100vh', // Full viewport height for responsiveness
        '41.563rem': '41.563rem', // Keeping rem for consistent spacing
        '0.5': '2px', // Fine control for very small height elements
        '22': '88px', // Standard height definition
      },
      pb: {
        '100': '500px', // Padding-bottom
      },
    },
  },
  plugins: [],
};
export default config;
