import { prisma } from '~/lib'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'

/**
 * It gets the session from the request, and if there is no session, it returns a 401 error. If there
 * is a session, it gets all the classes from the database and returns them
 * @param req - The request object.
 * @param res - the response object
 */
const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const classId = req.query.classId as string
	if (!session) {
		// res.status(401) // disabled for now during dev.
		// res.end()
		console.log(`unauthed req for /api/classes/${classId}`)
	}
	try {
		const classes = await prisma.class.findUniqueOrThrow({
			where: {
				id: classId,
			},
			select: {
				id: true,
				title: true,
				classNum: true,
				date: true,
				description: true,
				tags: {
					select: {
						id: true,
						tag: true,
						color: true,
					},
				},
				assignments: {
					select: {
						id: true,
						dateAssigned: true,
						dateDue: true,
						name: true,
						description: true,
						resources: true,
						tags: {
							select: {
								id: true,
								tag: true,
								color: true,
							},
						},
						submitUrl: true,
					},
				},
				materialLinks: true,
				checkinTweet: true,
				vod: true,
				slidesUrl: true,
			},
		})
		res.status(200).json(classes)
	} catch (error) {
		res.status(500).json(error)
	}
}
export default handler
