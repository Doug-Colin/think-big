import { Text } from '@mantine/core'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

export default function CalendarPage({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return <Text>One day, I will be a calendar.</Text>
}

CalendarPage.auth = {
	required: true,
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}
