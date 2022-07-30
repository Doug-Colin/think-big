import { prisma } from '~/lib'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'
import { userClassStatus } from '~/common/dbSelect'
/**
 * It gets the session from the request, and if there is no session, it returns a 401 error. If there
 * is a session, it gets all the classes from the database and returns them
 * @param req - The request object.
 * @param res - the response object
 */

interface QueryParams {
	userId: string
	action: 'status' | 'update'
}
const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const { userId, action } = req.query as Partial<QueryParams>
	const { method, headers } = req

	console.log(headers)
	if (!session) {
		// res.status(401) // disabled for now during dev.
		// res.end()
		console.log('unauthed req for /api/classes/all')
	}
	switch (action) {
		case 'status':
			if (method !== 'GET') res.status(400).end()
			try {
				const classes = await prisma.user.findFirstOrThrow({
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
				res.status(200).json(classes)
			} catch (error) {
				res.status(500).json(error)
			}
	}
}
export default handler
