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
}

module.exports = getConfig(nextConfig)
