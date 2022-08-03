import type { NextApiHandler } from 'next'
import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import { fetchCurrentUser, FetchCurrentUserResult } from '~/hooks'
import * as httpResponse from '~/lib/httpResponse'

type ErrorMessage = {
	message?: string
}

type Data = {
	name?: string
}

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const { method, query } = req
	if (!session) httpResponse.unauthorized(res)
	try {
		if (query.userId === 'me' && method === 'GET') {
			const currentUserProfile = await fetchCurrentUser(session.user.id)
			httpResponse.json(res, currentUserProfile)
		}
	} catch (error) {
		httpResponse.serverErrorJSON(res, error)
	}
}
export default handler
