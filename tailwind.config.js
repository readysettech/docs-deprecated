const primary = {
  50: "#F8F4FE",
  100: "#EFE5FD",
  200: "#E2CFFC",
  300: "#CDACF9",
  400: "#AF7CF7",
  500: "#9F63F5",
  600: "#7C39E6",
  700: "#6A2DC7",
  800: "#59279E",
  900: "#49217C",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          ...primary,
          DEFAULT: primary[600],
          hover: primary[700],
        },
      },
      boxShadow: {
        floating:
          "0px 8px 10px -6px rgba(0, 0, 0, 0.08), 0px 20px 25px -5px rgba(0, 0, 0, 0.08)",
        foreground:
          "0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px -1px rgba(0, 0, 0, 0.06), 0px 3px 6px -3px rgba(0, 0, 0, 0.05), 0px 2px 4px -2px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)",
        button:
          "0px 4px 4px rgba(0, 0, 0, 0.01), 0px 3px 3px rgba(0, 0, 0, 0.01), 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 0px 1px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  
  plugins: [],
}