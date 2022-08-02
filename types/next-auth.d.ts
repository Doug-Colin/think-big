import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

declare module 'next-auth' {
	interface DiscordGuild {
		id: string
	}

	interface AxiosResponse {
		data: DiscordGuild[]
	}

	interface Session {
		user: {
			id: string
			role: 'USER' | 'MOD' | 'ADMIN'
		}
	}
	interface User {
		role: 'USER' | 'MOD' | 'ADMIN'
	}
}

declare module 'next-auth/providers/discord' {
	interface DiscordProfile {
		discordId: string
	}
}
