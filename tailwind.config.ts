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
          '100': '404px',
          "full":"436px"
        },
        height: {
          '100': '41.563rem',
          "0.5":"2px",
          "22":"88px"
        },
        pb:{
          "100":"500px"
        }
    },
  },
  plugins: [],
};
export default config;
