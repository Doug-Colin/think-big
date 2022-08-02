import { prisma, axiosClient } from '~/lib'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
 * It fetches the class statuses of a user
 * @param {string} userId - The user's id
 * @returns An array of objects with the following properties:
 * 	- id
 * 	- classId
 * 	- classStatus
 *
 */
export const fetchClassStatuses = async (userId: string) => {
	try {
		const data = await prisma.classStatus.findMany({
			where: {
				userId: { equals: userId },
			},
			select: userClassStatus,
		})
		const formattedData = {
			id: userId,
			classes: data.map((result) => ({
				id: result.classId,
				status: result.status,
			})),
		}
		return formattedData
	} catch (err) {
		console.error(err)
	}
}

/**
 * It fetches the user's class status records from the server
 * @param {string} userId - string - The user's ID
 * @returns An object with the following properties:
 * 	- userId: string
 * 	- classId: string
 * 	- status: string
 */
const fetchAPI = async (userId: string): Promise<UserClassStatusRecord> => {
	const client = axiosClient()
	try {
		const { data } = await client.get(`/api/user/${userId}/class/status/all`)
		return data
	} catch (error) {
		return error
	}
}

/**
 * It updates the status of a class for a user
 * @param {string} userId - The user's id
 * @param {string} classId - The id of the class you want to update the status of
 * @param newStatus - UserClassStatus['status']
 */
export const updateClassStatus = async (
	userId: string,
	classId: string,
	newStatus: UserClassStatus['status']
) => {
	try {
		const record = await prisma.classStatus.upsert({
			where: {
				classId_userId: {
					userId,
					classId,
				},
			},
			update: {
				status: newStatus,
			},
			create: {
				userId,
				classId,
				status: newStatus,
			},
			select: userClassStatus,
		})
		const formattedData = {
			id: record.userId,
			status: [
				{
					classId: record.classId,
					status: record.status,
				},
			],
		}
	} catch (error) {
		console.error(error)
	}
}
/**
 * It updates the status of a class for a user
 * @param {string} userId - the user's id
 * @param {string} classId - the id of the class you want to update
 * @param newStatus - UserClassStatus['status']
 * @returns The data is being returned.
 */
export const updateClassStatusAPI = async (
	userId: string,
	classId: string,
	newStatus: UserClassStatus['status']
) => {
	const client = axiosClient()
	try {
		const { data } = await client.put(
			`/api/user/${userId}/class/update/${classId}`,
			{ newStatus }
		)
		return data
	} catch (err) {
		console.error(err)
	}
}

/**
 * It's a function that takes a queryKey and a userId and returns the result of a query that uses the
 * queryKey to fetch data from the API using the userId
 * @param {string[]} queryKey - This is an array of strings that uniquely identify the query.
 * @param {string} userId - The userId of the user you want to get the class statuses for.
 * @returns The result of the useQuery hook.
 */
export const useClassStatuses = (queryKey: string[], userId: string) => {
	console.log('useClassStatuses called')
	const result = useQuery(queryKey, () => fetchAPI(userId))
	console.log('useClassStatuses result', result)
	return result
}
