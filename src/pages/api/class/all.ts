import { prisma } from '~/lib'
import { getServerSession } from '../auth/[...nextauth]'

/**
 * It gets the session from the request, and if there is no session, it returns a 401 error. If there
 * is a session, it gets all the classes from the database and returns them
 * @param req - The request object.
 * @param res - the response object
 */
export default async function handler(req, res) {
	const session = await getServerSession(req, res)
	if (!session) {
		// res.status(401) // disabled for now during dev.
		// res.end()
		console.log('unauthed req for /api/classes/all')
	}
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
	res.status(200).json(classes)
}
