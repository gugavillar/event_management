import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

const eslintConfig = [
	...fixupConfigRules(
		compat.extends(
			'@rocketseat/eslint-config/next',
			'plugin:import/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:@tanstack/eslint-plugin-query/recommended',
			'next/core-web-vitals',
		),
	),
	{
		rules: {
			camelcase: 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					ignoreRestSiblings: true,
				},
			],

			'import/order': [
				'error',
				{
					groups: [
						'external',
						'builtin',
						'internal',
						['parent', 'sibling'],
						['object', 'type'],
						'index',
					],

					pathGroups: [
						{
							pattern: '{react,react-dom/**,next,next/**}',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '{@/components}',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: '**/*.+(css)',
							group: 'index',
							position: 'after',
						},
					],

					'newlines-between': 'always',

					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},
	},
]

export default eslintConfig
