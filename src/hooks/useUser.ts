import { prisma, axiosClient } from '~/lib'
import { useQuery } from '@tanstack/react-query'
import superjson from 'superjson'
import { Prisma } from '@prisma/client'
import { findUniqueUser } from '~/lib/db'

export type FetchCurrentUserResult = Prisma.PromiseReturnType<
	typeof fetchCurrentUser
>

export const fetchCurrentUser = async (
	userId: Prisma.UserCreateInput['id']
) => {
	const data = await prisma.user.findUniqueOrThrow(findUniqueUser(userId))
	return data
}

export const fetchCurrentUserAPI =
	async (): Promise<FetchCurrentUserResult> => {
		const client = axiosClient()
		const { data } = await client.get('/api/user/me')
		const deserialized = superjson.deserialize<FetchCurrentUserResult>(data)
		return deserialized
	}

export const useCurrentUser = () => {
	const result = useQuery<FetchCurrentUserResult, Prisma.RejectOnNotFound>(
		['user', 'me'],
		fetchCurrentUserAPI
	)
	return result
}
