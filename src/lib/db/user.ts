import { Prisma } from '@prisma/client'

export const findUniqueUser = (userId: string) => {
	return Prisma.validator<Prisma.UserFindUniqueOrThrowArgs>()({
		where: {
			id: userId,
		},
	})
}
