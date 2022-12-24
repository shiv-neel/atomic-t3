import {
	Box,
	Button,
	Divider,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { VscAccount, VscBug, VscKey } from 'react-icons/vsc'
import AppAppearance from '../components/account_page_view/AppAppearance'
import PersonalInformation from '../components/account_page_view/PersonalInformation'
import ReportBug from '../components/account_page_view/ReportBug'
import SecurityAndPrivacy from '../components/account_page_view/SecurityAndPrivacy'

const Account = () => {
	const Router = useRouter()
	const { data: session } = useSession()
	const handleSignOut = () => {
		console.log(`signing out ${session!.user!.email}`)
		Router.push('/')
		signOut()
	}

	const user = session?.user
	useEffect(() => {
		if (!user) {
			Router.push('/signin')
		}
	}, [session])

	return (
		<Box className='mx-36 mt-8'>
			<p className='mb-8 text-4xl font-bold'>{user && user.email}</p>
			<Tabs variant='soft-rounded' colorScheme='messenger'>
				<TabList className='my-4'>
					<Tab className='flex gap-1'>
						<VscAccount className='text-xl' />
						Personal Information
					</Tab>

					<Tab className='flex gap-1'>
						<IoColorPaletteOutline className='text-xl' />
						App Appearance
					</Tab>
					<Tab className='flex gap-1'>
						<VscBug className='text-xl' />
						Report Bug
					</Tab>
					<Tab className='flex gap-1'>
						<VscKey className='text-xl' />
						Security and Privacy
					</Tab>
				</TabList>
				<Divider className='mb-8' />
				<TabPanels>
					<TabPanel>
						<PersonalInformation user={user} />
					</TabPanel>
					<TabPanel>
						<AppAppearance />
					</TabPanel>
					<TabPanel>
						<ReportBug />
					</TabPanel>{' '}
					<TabPanel>
						<SecurityAndPrivacy />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	)
}

export default Account
