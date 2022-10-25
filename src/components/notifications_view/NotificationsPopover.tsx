import { Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { Notification } from '../../models/Notification'
import NotificationCard from './NotificationCard'

interface NotificationsPopoverProps {
	notifications: Notification[]
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
