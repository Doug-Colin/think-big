import {
	NextApiHandler,
	NextApiRequest,
	NextApiResponse,
	GetServerSidePropsContext,
} from 'next'
import NextAuth, {
	NextAuthOptions,
	Session,
	unstable_getServerSession,
} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import DiscordProvider, { DiscordProfile } from 'next-auth/providers/discord'
import { prisma } from '~/lib'
import axios from 'axios'
import type { User, Account } from 'next-auth'
import type { APIGuild } from 'discord-api-types/v10'
import { env } from '~/lib/env.mjs'

/**
 * It checks if the user is a member of the server
 * @param {string} access_token - The access token that was returned from the OAuth2 flow.
 * @returns A boolean value
 */
const isServerMember = async (access_token: string) => {
	const guildId = '735923219315425401'

	const { data } = await axios.get(
		'https://discord.com/api/v10/users/@me/guilds',
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
	)
	if (
		data.some((guild: APIGuild) => {
			if (guild.id === guildId) return true
		})
	) {
		return true
	}
	return false
}

/**
 * It updates the user's serverMember field to the value of the isServerMember parameter
 * @param {User} userId - User - The user object that we're updating
 * @param {boolean} isServerMember - boolean - This is a boolean that determines whether the user is a
 * server member or not.
 */
const updateServerMember = async (userId: string, isServerMember: boolean) => {
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			serverMember: isServerMember,
		},
	})
}

/**
 * It generates a random string of random length
 * @returns A string of random characters.
 */
const generateRandomString = () => {
	let randomString = ''
	const randomNumber = Math.floor(Math.random() * 10)

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94))
	}

	return randomString
}

const authOptions: NextAuthOptions = {
	providers: [
		DiscordProvider({
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
			authorization: {
				url: 'https://discord.com/api/oauth2/authorize',
				params: {
					scope: 'identify email guilds guilds.members.read',
					state: generateRandomString(),
					display: 'popup',
				},
			},
			checks: 'state',
			async profile(profile: DiscordProfile, tokens) {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
				} else {
					const format = profile.avatar.startsWith('a_') ? 'gif' : 'png'
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
				}
				return {
					id: profile.id,
					discordId: profile.id,
					name: `${profile.username}#${profile.discriminator}`,
					discordTag: `${profile.username}#${profile.discriminator}`,
					email: profile.email,
					image: profile.image_url,
					serverMember: !!tokens.access_token
						? await isServerMember(tokens.access_token)
						: false,
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			// Is the account disabled? Get out of here!
			if (user.userDisabled) return false
			// 100Devs Discord server member? proceed!
			if (user.serverMember) return true
			// check to see if user is a member of the discord server & update status if they are
			const serverMemberStatus = !!account.access_token
				? await isServerMember(account.access_token)
				: false
			if (serverMemberStatus) {
				updateServerMember(account.userId, serverMemberStatus)
				return true
			}
			// nope, get out.
			return false
		},
		async session({ session, user }) {
			session.user.id = user.id
			session.user.role = user.role
			session.user.name = user.name
			return session
		},
	},
	pages: {
		newUser: '/dashboard/profile?newuser=true',
	},
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	events: {
		signIn: (message) =>
			console.info(
				'\x1b[1mUser Signin:\x1b[0m',
				`ID: ${message.user.id}; Discord Tag: ${message.user.discordTag}`
			),
		createUser: (message) =>
			console.info(
				'\x1b[1mCreate User:\x1b[0m',
				`ID: ${message.user.id}; Discord Tag: ${message.user.discordTag}`
			),
		session: (message) =>
			console.info(
				'\x1b[1mSession Request:\x1b[0m',
				`ID: ${message.session.user.id}`
			),
	},
}

/**
 * It gets the session from the server
 * @param req - The request object from the server.
 * @param res - The response object from the server.
 * @returns The session object
 */
export const getServerSession = async (
	req: GetServerSidePropsContext['req'],
	res: GetServerSidePropsContext['res']
) => {
	const session = await unstable_getServerSession(req, res, authOptions)
	return session
}

export default NextAuth(authOptions)
