import { Prisma } from '@prisma/client'

export const findUniqueUser = (userId) => {
	return Prisma.validator<Prisma.UserFindUniqueOrThrowArgs>()({
		where: {
			id: userId,
		},
	})
}
