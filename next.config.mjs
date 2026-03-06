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
}

export default nextConfig
