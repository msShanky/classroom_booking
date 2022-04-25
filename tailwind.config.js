const colors = require("tailwindcss/colors");

module.exports = {
	content: ["src/pages/**/*.{js,ts,jsx,tsx}", "src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			primary: colors.indigo,
			secondary: colors.yellow,
			neutral: colors.gray,
		},
		fontFamily: {
			sans: "Montserrat",
		},
	},
	plugins: [],
};

