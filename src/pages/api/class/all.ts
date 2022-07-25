// import prisma from '~/lib/prisma'
import superjson from 'superjson'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * It finds all the classes in the database and returns them as a JSON object
 * @param req - The request object.
 * @param res - The response object.
 */
export default async function handler(req, res) {
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
