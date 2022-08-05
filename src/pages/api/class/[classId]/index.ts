import { getServerSession } from '~/pages/api/auth/[...nextauth]'
import type { NextApiHandler } from 'next'
import { fetchSingleClass } from '~/hooks'
import * as httpResponse from '~/lib/httpResponse'
import { isDevEnv } from '~/lib'

const handler: NextApiHandler = async (req, res) => {
	const session = await getServerSession(req, res)
	const classId = req.query.classId as string
	if (!session) {
		!isDevEnv && httpResponse.unauthorized(res)
		isDevEnv && console.log(`unauthed req for /api/classes/${classId}`)
	}
	try {
		const data = await fetchSingleClass(classId)
		httpResponse.json(res, data)
	} catch (err) {
		httpResponse.serverErrorJSON(res, err)
	}
}
export default handler
