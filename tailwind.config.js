/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				purple100: '#3D2445',
				purple80: '#8B7294',
				purple60: '#EFE9F3',
				secondaryGreen: '#13A959',
				primaryBackground: '#F0F3F6',
				primaryGray: '#808080',
				secondGray: '#A9A6AA',
				blueEdit: '#0EA5E9',
			},
			fontFamily: {
				sans: ['Quicksand', 'sans-serif'],
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [],
};
