import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import DiscordProvider from 'next-auth/providers/discord'
import prisma from '~/lib/prisma'
import axios from 'axios'
import superjson from 'superjson'

const authHandler: NextApiHandler = (req, res) =>
	NextAuth(req, res, authOptions)
export default authHandler

const authOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			authorization:
				'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.members.read',
			profile(profile) {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
				} else {
					const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
				}
				return {
					id: profile.id,
					name: `${profile.username}#${profile.discriminator}`,
					email: profile.email,
					image: profile.image_url,
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, session }) {
			// console.log(user, account, profile, session)
			// Is the account disabled? Get out of here!
			if (user.userDisabled) return false
			// 100Devs Discord server member? proceed!
			if (user.serverMember) return true
			// check to see if user is a member of the discord server
			const guilds = await axios
				.get({
					url: 'https://discord.com/api/v10/users/@me/guilds',
					headers: {
						Authorization: `Bearer ${account.access_token}`,
					},
					transformResponse: [
						(data) => {
							const { json, meta } = superjson.serialize(data)
							return json
						},
					],
				})
				.then((res) => JSON.parse(res))
			await console.dir(guilds)
			return true
		},
	},
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
}
