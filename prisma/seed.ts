import { PrismaClient, Prisma } from '@prisma/client'
import { tags } from './seed-data'
import { fakeClass } from './fakeGen'
export const prisma = new PrismaClient()

async function main() {
	console.log(`🌱  Seeding database`)

	console.info(`🌱  Tags:	Creating / Updating`)
	const allTags = []
	await tags.forEach((item) => {
		try {
			const dbTrans = prisma.tag.upsert({
				where: {
					tag: item.name,
				},
				update: {
					color: item.color,
				},
				create: {
					tag: item.name,
					color: item.color,
				},
				select: {
					tag: true,
				},
			})
			console.info(`  💾  Upserted tag: ${item.name}`)
			allTags.push(item.name)
		} catch (err) {
			console.error(err)
		}
	})
	console.info(`🌱  Tags:	Complete`)

	if (process.env.DEVSEED) {
		console.info(`🌱  Seeding fake data for development...`)

		console.info('🌱  Creating Classes...')
		const classEntries = fakeClass(20, allTags)

		classEntries.forEach((entry) => {
			prisma.class.create({
				data: entry,
			})
			console.info(` 💾  Created Class entry: ${entry.title}`)
		})

		console.info(`🌱  Fake data completed.`)
	}
	console.log(`🌱  Seeding finished.`)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		console.info('Disconnecting from db...')
		await prisma.$disconnect()
	})
