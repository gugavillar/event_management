import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		coverage: {
			exclude: [
				'**/node_modules/**',
				'**/dist/**',
				'**/prisma/**',
				'src/@types/**',
				'src/assets/**',
				'src/**/**/index.ts',
				'src/app/**',
				'src/**/**/*.types.ts',
			],
			include: ['src/**/*.{ts,tsx}'],
			provider: 'v8',
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: './vitest.setup.ts',
	},
})
