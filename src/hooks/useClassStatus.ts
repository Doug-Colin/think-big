import { prisma, axiosClient } from '~/lib'
import { useQuery } from '@tanstack/react-query'
import { userClassStatus } from '~/common/dbSelect'

export interface UserClassStatusRecord {
	id: string
	classes: UserClassStatus[]
}

export const keyClassStatuses = (userId: string) => [
	'class',
	userId,
	'statuses',
]

/**
 * It fetches all the classes from the database and returns them
 * @returns An array of objects with the following properties:
 * 	id: true,
 * 	title: true,
 * 	classNum: true,
 * 	date: true,
 * 	description: true,
 * 	materialLinks: true,
 * 	tags: true,
 */
export const fetchClassStatuses = async (userId: string) => {
	try {
		const classStatuses = await prisma.user.findFirstOrThrow({
			where: {
				id: userId,
			},
			select: {
				id: true,
				classes: {
					select: userClassStatus,
				},
			},
		})
		// const { json } = superjson.serialize(classes)

		return classStatuses
	} catch (err) {
		console.error(err)
	}
}

/**
 * It fetches all the classes from the server and returns them as an array of ClassRecord objects
 * @returns An array of ClassRecord objects
 */
const fetchAPI = async (userId: string): Promise<UserClassStatusRecord> => {
	const fetch = axiosClient()
	try {
		const { data } = await fetch.get(`/api/user/${userId}/class/status/all`)
		return data
	} catch (error) {
		return error
	}
}

/**
 * `useClasses` is a React hook that returns the result of a query for all classes
 * @returns The result of the useQuery hook.
 */
export const useClassStatuses = (queryKey: string[], userId: string) => {
	console.log('useClassStatuses called')
	const result = useQuery(queryKey, () => fetchAPI(userId))
	return result
}
