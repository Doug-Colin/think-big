import { prisma, axiosClient } from '~/lib'
import { useQuery } from '@tanstack/react-query'

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
const fetchClasses = async () => {
	try {
		const classes: ClassRecord[] = await prisma.class.findMany({
			select: {
				id: true,
				title: true,
				classNum: true,
				date: true,
				description: true,
				materialLinks: true,
				tags: true,
			},
		})
		// const { json } = superjson.serialize(classes)

		return classes
	} catch (err) {
		console.error(err)
	}
}

/**
 * It fetches all the classes from the server and returns them as an array of ClassRecord objects
 * @returns An array of ClassRecord objects
 */
const fetchClassesAPI = async (): Promise<ClassRecord[]> => {
	const fetch = axiosClient()
	const { data } = await fetch.get('/api/class/all')
	return data
}

/**
 * `useClasses` is a React hook that returns the result of a query for all classes
 * @returns The result of the useQuery hook.
 */
const useClasses = () => {
	console.log('useClasses called')
	const result = useQuery<ClassRecord[]>(['classes'], fetchClassesAPI)
	return result
}

export { fetchClasses, fetchClassesAPI, useClasses }
