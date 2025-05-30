/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	env: {
		API_BASE_URL: process.env.API_BASE_URL,
		API_IBGE_UF: process.env.API_IBGE_UF,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	},
}

export default nextConfig
