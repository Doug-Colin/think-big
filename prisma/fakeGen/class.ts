import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

export const fakeClass = (num: number, tags: string[]) => {
	const fakeData: Prisma.ClassCreateInput[] = []
	for (let i = 0; i < num; i++) {
		const connectTags = faker.helpers
			.uniqueArray(tags, 3)
			.map((tag) => {
				return {
					tag,
				}
			})
			.reduce((prev, curr) => {
				return { ...prev, ...curr }
			})
		const data: Prisma.ClassCreateInput = {
			title: `${faker.hacker.ingverb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}s`,
			classNum: i + 1,
			cohort: '2022',
			date: faker.date.past(1),
			description: faker.hacker.phrase(),
			tags: {
				connect: {
					...connectTags,
				},
			},
			assignments: {},
			checkinUrl: faker.internet.url(),
			vod: {},
		}
		fakeData.push(data)
	}
	return fakeData
}
