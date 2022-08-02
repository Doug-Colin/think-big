import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { ApiErrorResponse, NextApiHandler } from 'next'
import { fetchClassStatuses } from '~/hooks'

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
		// res.status(401).json({message: 'You must be logged in!}) // disabled for now during dev.
		console.log('unauthed req for /api/classes/all')
	}
	if (userId !== session.user.id && session.user.role !== 'USER') {
		res.status(403).json({ message: 'Cannot check status for another user' })
	}
	switch (action) {
		case 'status':
			if (method !== 'GET') res.status(400).end()
			try {
				const classes = await fetchClassStatuses(userId)
				res.status(200).json(classes)
			} catch (error) {
				res.status(500).json(error)
			}
	}
}
export default handler
