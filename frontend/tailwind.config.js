/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7f2",
          100: "#d7ecdf",
          500: "#2f7d5f",
          600: "#25664d",
          700: "#1d4f3c",
          900: "#123127"
        },
        accent: {
          100: "#f8efe3",
          300: "#f2d2a5",
          500: "#db9f4f"
        },
        slate: {
          950: "#0f1720"
        }
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 32, 0.08)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(47,125,95,0.18) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};
