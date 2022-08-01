import { Text } from '@mantine/core'
import { ClassTable, ClassAccordianTable } from '~/components/ClassTable'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
	fetchClasses,
	useClasses,
	fetchClassStatuses,
	useClassStatuses,
	keyClassStatuses,
} from '~/hooks'
import superjson from 'superjson'
import { useSession } from 'next-auth/react'
import { getServerSession } from '../api/auth/[...nextauth]'

export async function getServerSideProps(context) {
	const { req, res } = context
	const session = await getServerSession(req, res)
	const { id: userId } = session?.user
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['classes'], fetchClasses)
	await queryClient.prefetchQuery(keyClassStatuses(userId), () =>
		fetchClassStatuses(userId)
	)
	const queryState = dehydrate(queryClient)
	const serializedQueryState = superjson.stringify(queryState)

	return {
		props: {
			dehydratedState: serializedQueryState,
		},
	}
}

const ClassPage = () => {
	const { data: session, status } = useSession()
	const { id: userId } = session?.user || { id: '' }
	const {
		data: classData,
		isLoading: classLoading,
		isError: classErrorStat,
		error: classError,
	} = useClasses()
	const {
		data: statusData,
		isLoading: statusLoading,
		isError: statusErrorStat,
		error: statusError,
	} = useClassStatuses(keyClassStatuses(userId), userId)

	if (classLoading || statusLoading) return <Text>Loading...</Text>
	if (classErrorStat || statusErrorStat)
		return <Text>{`Error: ${classError || statusError}`}</Text>
	return <ClassTable data={classData} status={statusData} />
	// return <ClassAccordianTable data={classData} status={statusData} />
}

export default ClassPage
