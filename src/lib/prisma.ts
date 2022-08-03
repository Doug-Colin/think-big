import { PrismaClient } from '@prisma/client'

declare global {
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient
		}
	}
}

let prisma: PrismaClient

if (typeof window === 'undefined') {
	if (process.env.NODE_ENV === 'production') {
		prisma = new PrismaClient()
	} else {
		if (!global.prisma) {
			global.prisma = new PrismaClient({
				log: ['error', 'warn'],
				errorFormat: 'pretty',
			})
			global.prisma.$use(async (params, next) => {
				const before = Date.now()
				const result = await next(params)
				const after = Date.now()
				console.info(
					'\x1b[1mPrisma\x1b[0m',
					`query ${params.model}.${params.action} took ${after - before}ms`
				)
				return result
			})
		}

		prisma = global.prisma
	}
}

export { prisma }
