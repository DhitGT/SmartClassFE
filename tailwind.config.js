/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./app.vue",
      "./pages/**/*.vue",
      "./pages/**/**.vue",
      "./pages/**/**/*.vue",
      "./pages/*.vue",
      "./components/**/*.vue",
      "./components/**/**.vue",
      "./layouts/**/*.vue",
      "./*",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  