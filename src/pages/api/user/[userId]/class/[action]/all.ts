import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'
import { fetchClassStatuses } from '~/hooks'
import { Prisma } from '@prisma/client'
import * as httpResponse from '~/lib/httpResponse'
import { isDevEnv } from '~/lib'

interface QueryParams {
	userId: Prisma.UserCreateInput['id']
	action: 'status' | 'update'
}

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const { userId, action } = req.query as Partial<QueryParams>
	const { method, headers } = req

	console.log(headers)
	if (!session) {
		!isDevEnv && httpResponse.unauthorized(res)
		isDevEnv && console.log('unauthed req for /api/classes/all')
	}
	if (userId !== session.user.id && session.user.role !== 'USER') {
		httpResponse.forbidden(res)
	}
	switch (action) {
		case 'status':
			if (method !== 'GET') httpResponse.badRequest(res)
			try {
				const classes = await fetchClassStatuses(userId)
				httpResponse.json(res, classes)
			} catch (error) {
				httpResponse.serverErrorJSON(res, error)
			}
	}
}
export default handler
