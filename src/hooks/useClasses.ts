import { prisma, axiosClient } from '~/lib'

import { useQuery } from '@tanstack/react-query'

/**
 * It fetches all the classes from the database and returns them as a JSON object
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
		// if (useAPI) {
		// const client = axiosClient()
		// const { data } = await client.get('/api/class/all')
		// 	return data
		// }
		const classes = await prisma.class.findMany({
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

const fetchClassesAPI = async () => {
	const fetch = axiosClient()
	const { data } = await fetch.get('/api/class/all')
	return data
}

const useClasses = () => {
	console.log('useClasses called')
	const result = useQuery(['classes'], fetchClassesAPI, {
		staleTime: 1000 * 60 * 5,
	})
	return result
}

export { fetchClasses, fetchClassesAPI, useClasses }
