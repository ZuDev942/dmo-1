module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ghtk: "#00904a",
        "ghtk-light": "#069255",
        "ghtk-gray": "#ADADAD",
        "hrm-color": "#172b4d",
      },
    },
  },
  plugins: [],
};
