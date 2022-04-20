module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      screens: {
        "m-sm": { max: "639px" },
      },
      flex: {
        2: "2 2 0%",
        3: "3 2 0%",
      },
      minWidth: {
        90: "90px",
      },
      height: {
        100: "35rem",
        68: "17rem",
      },

      textColor: {
        skin: {
          primary: "var(--primary-text)",
          secondary: "var(--secondary-text)",
          sub: "var(--sub-text)",
          dot: "var(--dot-color)",
          orange: "var(--orange)",
          primarygray:"var(--lightgray-text)",
          secondarygray:"var(--secondarygray-text)",
        },
      },
      backgroundColor: {
        skin: {
          primary_button: "var(--primary-button)",
          secondary_button: "var(--secondary-button)",
          header: "var(--header-bg)",
          subheader: "var(--subheader-bg)",
          home: "var(--home-page-bg)",
          step:"var(--userform-step-bg)",
          section_two: "var(--section-two-bg)",
          section_three: "var(--section-three-bg)",
          footer: "var(--footer-bg)",
          card: "var(--card-bg)",
          legal_card:"var(--lightgray-bg)",
          radio_card:"var(--radio-bg )",
          questioncard:"var(--questioncard-bg)",
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
