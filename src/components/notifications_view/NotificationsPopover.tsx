import { Box, Divider } from '@chakra-ui/react'
import React from 'react'
import NotificationCard from './NotificationCard'

interface NotificationsPopoverProps {
	notifications: any[]
}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
	notifications,
}) => {
	return (
		<Box>
			{notifications.map((notification, i) => (
				<Box key={i}>
					<NotificationCard notification={notification} />
					<Divider />
				</Box>
			))}
		</Box>
	)
}

export default NotificationsPopover
