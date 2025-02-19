/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "semi-black": "#000000BD",
        "raffles-blue": "#170449",
        "raffles-light-blue": "#110044",
        "raffles-pink": "#FF7385",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        scrollbar: {
          custom: "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)"
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        modernRegular: ["ModernEraRegular", "sans-serif"],
        modernEraMedium: ['ModernEraRegular', 'sans-serif'],
        modernLight: ["ModernEraRegular", "sans-serif"],
        modernExtraBold: ["modern-extrabold", "sans-serif"],
        modernBold: ["ModernEraBold", "sans-serif"],
        modernEraBold: ["ModernEraBold", "sans-serif"],
      },
      fontWeight: {
        700: '700',  // Tailwind should already have 700, but you can ensure it here.
      },
      lineHeight: {
        4: '16px',  // Setting line height for 16px
      },
      letterSpacing: {
        '-2': '-2%',  // Custom letter-spacing (-2%)
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(55.21deg, #AD6FFF 9.69%, #FD98E8 47.47%, #FF7385 83.78%)",
        "ending-soon":
          "linear-gradient(45.68deg, #AD6FFF -87.89%, #FD98E8 26.08%, #FF7385 135.57%)",
      },
      clipPath: {
        triangle: "polygon(0% 0%, 100% 0%, 84% 100%, 0% 100%)",
        mobile: "polygon(0% 0%, 100% 20.5%, 100% 100%, 0% 100%)",
        imagePath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
        desktopPath: "polygon(17% 0, 100% 0, 100% 100%, 0 100%)",
        mobilePath: "polygon(0 0, 100% 0, 100% 100%, 0 80%);",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('tailwind-clip-path'), require('tailwind-scrollbar'), require('@tailwindcss/forms'),],
};
