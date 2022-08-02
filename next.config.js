/**
 * @type {import('next').NextConfig}
 */
const { env } = require('./envcheck')

function getConfig(config) {
	return config
}

const nextConfig = {
	/**
	 * Dynamic configuration available for the browser and server.
	 * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
	 */
	publicRuntimeConfig: {
		NODE_ENV: env.NODE_ENV,
	},
	reactStrictMode: true,
	// enable CORS
	async headers() {
		return [
			{
				// matching all API routes
				source: '/api/:path*',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{ key: 'Access-Control-Allow-Origin', value: '*' },
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		]
	},
}

module.exports = getConfig(nextConfig)
