// @ts-check
/**
 * This file is included in `/next.config.js` which ensures the app isn't built with invalid env vars.
 * It has to be a `.js`-file to be imported there.
 */

const { z } = require('zod')

/*eslint sort-keys: "error"*/
const envSchema = z
	.object({
		DISCORD_CLIENT_ID: z.string().transform((x) => x.toString()),
		DISCORD_CLIENT_SECRET: z.string(),
		MONGODB_URI: z.string(),
		MONGO_COLL: z.string(),
		MONGO_PW: z.string(),
		MONGO_SERVER: z.string(),
		MONGO_USER: z.string(),
		NEXTAUTH_SECRET: z.string(),
		NEXTAUTH_URL: z.string(),
		NODE_ENV: z.enum(['development', 'test', 'production']),
	})
	.deepPartial()

const env = envSchema.safeParse(process.env)

if (!env.success) {
	console.error(
		'❌ Invalid environment variables:',
		// @ts-ignore
		JSON.stringify(env.error.format(), null, 4)
	)
	process.exit(1)
}
console.info('✅ Environment variable check passed.')
module.exports.env = env.data
