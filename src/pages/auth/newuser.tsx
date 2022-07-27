import { useState } from 'react'
import {
	Modal,
	Button,
	Group,
	Radio,
	NativeSelect,
	Text,
	createStyles,
	Stack,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
	radioBtn: {
		'input:checked': {
			backgroundColor: theme.colors.secondary[4],
		},
	},
}))
function SignUpModal() {
	const [opened, setOpened] = useState(true)
	const [radioValue, setRadioValue] = useState('')
	const [natSelValue, setNativeSelectValue] = useState('')
	const [natSelDisabled, setNatSelDisabled] = useState(true)
	const [userStatus, setUserStatus] = useState('')
	const { classes } = useStyles()
	return (
		<>
			<Modal opened={opened} onClose={() => setOpened(false)} title='Welcome!'>
				<Stack>
					<Text>
						When you have a moment, please go to your account settings and
						complete your profile. For now, just one quick question.
					</Text>

					<Radio.Group
						value={radioValue}
						onChange={setRadioValue}
						label='Where are you on your 100Devs journey?'
						description='please choose one'
						orientation='vertical'
						required
						spacing='sm'
						className={classes.radioBtn}
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
							label="I've started, but not caught up."
							onClick={() => setNatSelDisabled(false)}
						/>
						{natSelDisabled ? null : (
							<NativeSelect
								value={natSelValue}
								placeholder='Please select your most recently watched class'
								onChange={(event) => {
									setNativeSelectValue(event.currentTarget.value)
									setUserStatus(event.currentTarget.value)
								}}
								data={[, 'temp1', 'temp2', 'temp3']}
							/>
						)}

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

					<Button
						onClick={() => console.log(userStatus)}
						color='highlightPrimary'
					>
						Submit
					</Button>
				</Stack>
			</Modal>

			<Group position='center'>
				<Button onClick={() => setOpened(true)}>Open Modal</Button>
			</Group>
		</>
	)
}

export default SignUpModal
