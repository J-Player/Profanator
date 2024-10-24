/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-blue": "#121f26",
				"dark-gray": "#242323",
				"light-gray": "lightgray",
				"orange": "orange",
				"whitesmoke": "whitesmoke",
				"red": "red",
				"gray": "gray",
			}
		},
	},
	plugins: [],
}
