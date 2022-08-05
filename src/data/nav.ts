type NavItem = {
	icon: string
	label: string
	url: string
}
type AuthRedirect = {
	[key: string]: string
}

export const nav = [
	{ icon: 'fa6-solid:gauge-high', label: 'Home', url: '/dashboard' },
	{ icon: 'fa6-solid:calendar-days', label: 'Calendar', url: '/calendar' },
	{ icon: 'fa6-solid:book', label: 'Assignments', url: '/assignment' },
	{ icon: 'fa6-solid:graduation-cap', label: 'Classes', url: '/class' },
] as const

export const authRedirect = {
	signIn: '/api/auth/signin?error=SessionRequired',
	accessDenied: '/api/auth/error?error=AccessDenied',
} as const
