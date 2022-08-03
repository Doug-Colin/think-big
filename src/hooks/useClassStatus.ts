import { prisma, axiosClient } from '~/lib'
import { useQuery, QueryKey } from '@tanstack/react-query'
import { queryClassStatusesByUser, upsertSingleClassStatus } from '~/lib/db'
import superjson from 'superjson'
import { Prisma } from '@prisma/client'

export type FetchClassStatusesResult = Prisma.PromiseReturnType<
	typeof fetchClassStatuses
>
/**
 * It fetches all the class statuses for a user and returns them in a formatted object
 * @param {string} userId - The user's id
 * @returns {FetchClassStatusesResult} An array of objects with the classId and status
 */
export const fetchClassStatuses = async (userId: string) => {
	try {
		const data = await prisma.classStatus.findMany(
			queryClassStatusesByUser(userId)
		)
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
 * It fetches all the class statuses for a user
 * @param {string} userId - The user's ID.
 * @returns {FetchClassStatusesResult} FetchClassStatusesResult
 */
const fetchClassStatusesAPI = async (
	userId: string
): Promise<FetchClassStatusesResult> => {
	const client = axiosClient()
	try {
		const { data } = await client.get(`/api/user/${userId}/class/status/all`)
		const deserialized = superjson.deserialize<FetchClassStatusesResult>(data)
		return deserialized
	} catch (error) {
		return error
	}
}

export const keyClassStatuses = (
	userId: Prisma.UserWhereUniqueInput['id']
): QueryKey => ['class', userId, 'statuses']

/**
 * It returns a query result for a query key and a user id
 * @param {QueryKey} queryKey - This is a unique key that will be used to identify this query.
 * @param {Prisma.UserCreateInput['id']} userId
 * @returns {FetchClassStatusesResult} The result of the query
 */
export const useClassStatuses = (
	queryKey: QueryKey,
	userId: Prisma.UserCreateInput['id']
) => {
	const result = useQuery<FetchClassStatusesResult, Error>(queryKey, () =>
		fetchClassStatusesAPI(userId)
	)
	return result
}

export type UpdateClassStatusResult = Prisma.PromiseReturnType<
	typeof updateClassStatus
>
/**
 * It takes a userId, classId, and newStatus, and updates the status of the class for the user
 * @param {Prisma.UserCreateInput['id']} userId - The user's id
 * @param {Prisma.ClassCreateInput['id']} classId - The id of the class
 * @param {Prisma.ClassStatusCreateInput['status']} newStatus - The updated status
 * @returns {UpdateClassStatusResult} The userId and the status of the class
 */
export const updateClassStatus = async (
	userId: Prisma.UserCreateInput['id'],
	classId: Prisma.ClassCreateInput['id'],
	newStatus: Prisma.ClassStatusCreateInput['status']
) => {
	try {
		const record = await prisma.classStatus.upsert(
			upsertSingleClassStatus(userId, classId, newStatus)
		)
		const formattedData = {
			id: record.userId,
			status: [
				{
					classId: record.classId,
					status: record.status,
				},
			],
		}
		return formattedData
	} catch (error) {
		console.error(error)
	}
}

/**
 * It updates the status of a class for a user
 * @param {Prisma.UserCreateInput['id']} userId - The id of the user who is updating the class status
 * @param {Prisma.ClassCreateInput['id']} classId - The id of the class you want to update
 * @param {Prisma.ClassStatusCreateInput['status']} newStatus - The updated status
 * @returns {UpdateClassStatusResult}
 */
export const updateClassStatusAPI = async (
	userId: Prisma.UserCreateInput['id'],
	classId: Prisma.ClassCreateInput['id'],
	newStatus: Prisma.ClassStatusCreateInput['status']
): Promise<UpdateClassStatusResult> => {
	const client = axiosClient()
	try {
		const { data } = await client.put(
			`/api/user/${userId}/class/update/${classId}`,
			superjson.serialize({ newStatus })
		)
		return data
	} catch (err) {
		console.error(err)
	}
}
