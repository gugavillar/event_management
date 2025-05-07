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
			height: {
				'page-content': 'calc(100vh - 7.5rem)',
			},
			gridTemplateColumns: {
				appLg: 'minmax(0, 60rem) 30rem',
				admin: 'auto 1fr',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
}
export default config
