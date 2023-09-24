import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: "#088587",
      white: "#ffffff",
      cyan: "#4eb99f",
      mostard: "#f2b134",
      grey: "#3b4155",
      grey2: "#f2f3f5",
      "light-grey": "#7b7b7d",
      "dark-blue": "#0e1729",
      "shark-blue": "#008dff",
      "eletric-orange": "#ed553b",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
