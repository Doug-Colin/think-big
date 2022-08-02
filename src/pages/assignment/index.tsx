import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { Text } from '@mantine/core'

export default function AssignmentPage({}: InferGetServerSidePropsType<
	typeof getServerSideProps
>) {
	return <Text>I am a placeholder for the Assignments page</Text>
}

AssignmentPage.auth = {
	required: true,
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return {
		props: {},
	}
}
