import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'
import { fetchClassStatuses, updateClassStatus } from '~/hooks'
import { z } from 'zod'
import superjson from 'superjson'
import * as httpResponse from '~/lib/httpResponse'
import { isDevEnv } from '~/lib'

interface QueryParams {
	classId: string
	userId: string
	action: 'status' | 'update'
}
const updateClassSchema = z.object({
	newStatus: z.enum(['not_started', 'in_progress', 'done']),
})

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const { classId, userId, action } = req.query as Partial<QueryParams>
	const { method } = req

	if (!session) {
		!isDevEnv && httpResponse.unauthorized(res)
		isDevEnv && console.log('unauthed req for /api/classes/all')
	}
	try {
		switch (action) {
			case 'status':
				if (method !== 'GET') httpResponse.badRequest(res)
				const classes = await fetchClassStatuses(userId)
				httpResponse.json(res, classes)
				break
			case 'update':
				if (method !== 'PUT') httpResponse.badRequest(res)
				const reqBody = updateClassSchema.parse(superjson.deserialize(req.body))
				console.log(reqBody)
				const statusUpdate = await updateClassStatus(
					userId,
					classId,
					reqBody.newStatus
				)
				httpResponse.json(res, statusUpdate)
				break
		}
	} catch (error) {
		httpResponse.serverErrorJSON(res, error)
	}
}

export default handler
