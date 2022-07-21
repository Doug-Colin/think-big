import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface DiscordGuild {
		id: string
	}

	interface AxiosResponse {
		data: DiscordGuild[]
	}

	interface Session {
		bearerToken: string
	}
}
