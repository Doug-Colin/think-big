export const assignmentId = {
	id: true,
}
export const assignmentAll = {
	id: true,
	dateAssigned: true,
	dateDue: true,
	name: true,
	description: true,
	resources: true,
	tags: {
		select: {
			id: true,
			tag: true,
			color: true,
		},
	},
	submitUrl: true,
}
