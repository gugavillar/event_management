/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	devIndicators: false,
	images: {
		unoptimized: true,
	},
	output: 'standalone',
	watchOptions: {
		ignored: ['node_modules', '.next', 'public', '**/*.spec.ts', '**/*.test.tsx', '**/__tests__/**'],
	},
}

export default nextConfig
