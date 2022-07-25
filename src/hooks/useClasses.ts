// import prisma from '~/lib/prisma'
import { axiosClient } from '~/lib'
const client = axiosClient()
// import axios from 'axios'

/**
 * It makes a GET request to the server, and returns the data that the server sends back
 * @returns An array of objects.
 */
export const fetchClasses = async () => {
	try {
		const { data } = await client.get('/api/class/all')

		return data
	} catch (err) {
		console.error(err)
	}
}
