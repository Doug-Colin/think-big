import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { Modal, Button, Group, Radio, NativeSelect } from '@mantine/core'

const NewUser = () => {
	return <>I will be the new user signup page</>
}

function SignUpModal() {
	const [opened, setOpened] = useState(false)
	const [radioValue, setRadioValue] = useState('react')
	const [natSelValue, setNativeSelectValue] = useState('')
	const [natSelDisabled, setNatSelDisabled] = useState(true)
	const [userStatus, setUserStatus] = useState('')
	return (
		<>
			<Modal opened={opened} onClose={() => setOpened(false)} title='Welcome!'>
				{
					<>
						<>
							{' '}
							When you have a moment, please go to your account settings and
							complete your profile. For now, just one quick question.
						</>

						<Radio.Group
							value={radioValue}
							onChange={setRadioValue}
							label='Where are you on your 100Devs journey?'
							description='please choose one'
							orientation='vertical'
							required
						>
							<Radio
								value='new'
								label='I am just starting my journey!'
								onClick={(event) => {
									setUserStatus(event.currentTarget.value)
									setNatSelDisabled(true)
								}}
							/>

							<Radio
								value='catchUp'
								label='I am on class:'
								onClick={() => setNatSelDisabled(false)}
							/>

							<NativeSelect
								disabled={natSelDisabled}
								value={natSelValue}
								placeholder='Please select your most recently watched class'
								onChange={(event) => {
									setNativeSelectValue(event.currentTarget.value)
									setUserStatus(event.currentTarget.value)
								}}
								data={[, 'temp1', 'temp2', 'temp3']}
							/>

							<Radio
								value='current'
								label='I am caught up with the most recent class'
								onClick={(event) => {
									setUserStatus(event.currentTarget.value)
									setNatSelDisabled(true)
								}}
							/>

							<Radio
								value='unsure'
								label="I'm not sure"
								onClick={(event) => {
									setUserStatus(event.currentTarget.value)
									setNatSelDisabled(true)
								}}
							/>
						</Radio.Group>

						<Button onClick={() => console.log(userStatus)}>Submit</Button>
					</>
				}
			</Modal>

			<Group position='center'>
				<Button onClick={() => setOpened(true)}>Open Modal</Button>
			</Group>
		</>
	)
}

export default SignUpModal
