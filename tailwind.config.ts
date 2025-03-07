import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        brand: {
          0:   "#FFFFFF", //white
          25:  "#FBFEFF", //Background
          50:  "#F7FAFD",  //NavBar
          100: "#E1EBF5",
          200: "#8FB4F0",
          300: "#fba762", //Orange
          400: "#8BAECF", //
          500: "#fba762",
          600: "#5483A3",
          700: "#426A86",
          800: "#335269",
          900: "#273E4F",
          950: "#1C2D3A", //Text
        },
      },
      screens: {
        'xs': '475px',  // Neuer Breakpoint für extra-small Geräte
        'sm': '640px',  // sm (Standard)
        'md': '768px',  // md (Standard)
        'lg': '1024px', // lg (Standard)
        'xl': '1280px', // xl (Standard)
        '2xl': '1536px', // 2xl (Standard)
        '3xl': '1800px', // Beispiel für einen weiteren benutzerdefinierten Breakpoint
      },
    },
  },
  plugins: [],
}
export default config
