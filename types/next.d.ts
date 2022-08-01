import next from 'next'

declare module 'next' {
	interface ApiErrorResponse {
		message: string
	}
}
