/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'sns-charcoal': '#1A1A1A',
				'sns-white': '#F2F2F2',
				'sns-lavendar-light': '#D1B0FF',
				'sns-lavendar-dark': '#A68AE3',
				'sns-grey-light': '#6C6C6C',
				'sns-grey-dark': '#2F2F2F',
				'sns-red': '#EC704B',
			},
		},
	},
	plugins: [],
};
