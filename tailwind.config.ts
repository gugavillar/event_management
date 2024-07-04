import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/preline/preline.js',
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				appLg: 'minmax(0, 60rem) 30rem',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
}
export default config
