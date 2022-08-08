import React from 'react'
import { Button, Grid, Container } from '@mantine/core'
import logo from 'public/thinkbig-logo.svg'
import classMaterialsImg from 'public/landingPage-class-materials.svg'
import stayOrganizedImg from 'public/landingpage-stay-organized.svg'
import workTogetherImg from 'public/landingpage-work-together.svg'
import stayUpToDateImg from 'public/landingpage-stay-up-to-date.svg'
import Image from 'next/image'

function landingPage() {
	return (
		<>
			<Container>
				<Image src={logo} alt='ThinkBig Logo' />
				<br />
				Welcome to the start of your journey as a software engineer!
			</Container>

			<Container>
				<Grid grow>
					<Grid.Col span={3}>
						<Image src={classMaterialsImg} alt='Teacher with students' />
						<br />
						<h2>Class Materials</h2>
						<span>
							Easily find materials and assignments for all 100Dev classes in
							one place.
						</span>
					</Grid.Col>

					<Grid.Col span={3}>
						<Image src={stayOrganizedImg} alt='Teacher with students' />
						<br />
						<h2>Stay organized</h2>
						<span>Track and manage past-due and upcoming assignments.</span>
					</Grid.Col>

					<Grid.Col span={3}>
						<Image src={workTogetherImg} alt='Teacher with students' />
						<br />
						<h2>Work together</h2>
						<span>
							Share helpful resources, find other community members to ask for
							help, or request help for a specific topic.
						</span>
					</Grid.Col>

					<Grid.Col span={3}>
						<Image src={stayUpToDateImg} alt='Teacher with students' />
						<br />
						<h2>Stay up to date</h2>
						<span>
							Access links to class streams, Discord announcements, and upcoming
							events.
						</span>
					</Grid.Col>
				</Grid>
			</Container>

			<Container size='xs'>
				<Button fullWidth>Sign Up Here!</Button>
			</Container>
		</>
	)
}

export default landingPage
