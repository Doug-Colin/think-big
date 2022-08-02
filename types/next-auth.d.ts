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
			name: string
			image: string
		}
	}
	interface User {
		id: string
		role: 'USER' | 'MOD' | 'ADMIN'
		name: string
	}
}

declare module 'next-auth/providers/discord' {
	interface DiscordProfile {
		discordId: string
	}
}
