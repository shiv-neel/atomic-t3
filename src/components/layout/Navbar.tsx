import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import Logo from "./Logo";
import { useEffect, useState } from 'react'
import {
  VscAccount,
  VscBell,
  VscBellDot,
  VscCircleFilled,
} from "react-icons/vsc";
import { BsCircleFill, BsMoon, BsSun } from "react-icons/bs";
import NotificationsPopover from "../notifications_view/NotificationsPopover";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { data: session } = useSession();
  const user = session?.user;
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
		<Box className='mx-auto flex w-5/6 list-none items-center justify-center gap-10 pt-10'>
			<Link href='/'>
				<li className='mr-auto cursor-pointer duration-75 hover:text-blue-600'>
					<Logo />
				</li>
			</Link>
			<li className=''>
				<Popover>
					<PopoverTrigger>
						{notifications.length ? (
							<Box className='-mr-2 flex cursor-pointer items-start font-semibold duration-75 hover:text-blue-600'>
								<VscBell className='text-3xl' />
								<BsCircleFill className='visible -ml-4 mt-1 text-xs text-blue-600' />
							</Box>
						) : (
							<Box className='-mr-2 flex cursor-pointer items-start font-semibold duration-75 hover:text-blue-600'>
								<VscBell className='text-3xl' />
								<BsCircleFill className='invisible -ml-4 mt-1 text-xs' />
							</Box>
						)}
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader>
							Notifications ({notifications.length})
						</PopoverHeader>
						<PopoverBody>
							{notifications.length ? (
								<NotificationsPopover notifications={notifications} />
							) : (
								<p className='flex justify-center py-4'>
									You&apos;re all caught up!
								</p>
							)}
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</li>
			<li
				onClick={toggleColorMode}
				className='ml-2 cursor-pointer text-3xl font-semibold duration-75 hover:text-blue-600'
			>
				{colorMode === 'light' ? <BsSun /> : <BsMoon />}
			</li>
			<Link href='/account'>
				<li className='cursor-pointer text-3xl font-semibold duration-75 hover:text-blue-600'>
					<VscAccount />
				</li>
			</Link>
		</Box>
	)
};

export default Navbar;
