import { Prisma } from '@prisma/client'
import { prisma, axiosClient } from '~/lib'
import {
	selectFetchClasses,
	querySingleClass,
	upsertManyCompletedClassesPayload,
} from '~/lib/db'
import { useQuery, QueryKey } from '@tanstack/react-query'
import superjson from 'superjson'

export type FetchClassesResult = Prisma.PromiseReturnType<typeof fetchClasses>
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
export const fetchClasses = async () => {
	try {
		const classes = await prisma.class.findMany(selectFetchClasses)
		return classes
	} catch (err) {
		console.error(err)
	}
}

/**
 * It fetches all the classes from the server and returns them as an array of ClassRecord objects
 * @returns An array of ClassRecord objects
 */
export const fetchClassesAPI = async () => {
	const fetch = axiosClient()
	const { data } = await fetch.get('/api/class/all')
	const formattedData = superjson.deserialize<FetchClassesResult>(data)
	return formattedData
}

/**
 * `useClasses` is a React hook that returns the result of a query for all classes
 * @returns The result of the useQuery hook.
 */
export const useClasses = () => {
	const result = useQuery<FetchClassesResult>(['classes'], fetchClassesAPI)
	return result
}

export type FetchSingleClassResult =
	| Prisma.PromiseReturnType<typeof fetchSingleClass>
	| Prisma.NotFoundError

/**
 * It fetches a single class from the database using the classId
 * @param {Prisma.ClassCreateInput['id']} classId - The id of the class you want to fetch
 * @returns {FetchSingleClassResult} The result of the query.
 */
export const fetchSingleClass = async (
	classId: Prisma.ClassCreateInput['id']
) => {
	try {
		const result = await prisma.class.findUniqueOrThrow(
			querySingleClass(classId)
		)
		return result
	} catch (err) {
		console.error(err)
	}
}

/**
 * It fetches a single class from the database using the classId
 * @param {Prisma.ClassCreateInput['id']} classId
 * @returns {FetchSingleClassResult} The data from the API call
 */
const fetchSingleClassAPI = async (classId: Prisma.ClassCreateInput['id']) => {
	try {
		const client = axiosClient()
		const { data } = await client.get(`/api/class/${classId}`)
		return data
	} catch (err) {
		console.log(err)
	}
}

/**
 * It takes a classId and returns a query key that can be used to fetch that class
 * @param classId - The id of the class we want to retrieve.
 */
export const keySingleClass = (
	classId: Prisma.ClassCreateInput['id']
): QueryKey => ['class', 'byId', classId]

/**
 * It returns a `QueryResult` object that contains the result of the query, and a function to refetch
 * the query
 * @param {Prisma.ClassCreateInput['id']} classId
 * @returns {FetchSingleClassResult} The result of the query
 */
export const useSingleClass = (classId: Prisma.ClassCreateInput['id']) => {
	const result = useQuery<FetchSingleClassResult, Prisma.NotFoundError>(
		keySingleClass(classId),
		() => fetchSingleClassAPI(classId)
	)
	return result
}

export type UpsertManyCompletedClassesResult = Prisma.PromiseReturnType<
	typeof upsertManyCompletedClasses
>
export interface CompletedClassesInput {
	userId?: string
	classes?: string[]
}

export const upsertManyCompletedClasses = async (
	data: CompletedClassesInput
) => {
	const { userId, classes } = data
	const payload = classes.map((classId) =>
		prisma.user.update(upsertManyCompletedClassesPayload(userId, classId))
	)
	const result = await prisma.$transaction(payload)
	return result
}

/**
 * It takes a payload of completed classes, and then it sends that payload to the server, which then
 * updates the database with the new completed classes
 * @param {CompletedClassesInput} payload - CompletedClassesInput
 * @returns {UpsertManyCompletedClassesResult} An array of completed classes
 */
export const upsertManyCompletedClassesAPI = async (
	payload: CompletedClassesInput
): Promise<UpsertManyCompletedClassesResult> => {
	const client = axiosClient()
	const { data } = await client.post(
		`/api/user/${payload.userId}/class/massupdate/`,
		{ data: superjson.serialize(payload) }
	)
	return data
}
