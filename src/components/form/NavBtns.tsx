import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiNotepad } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { VscPreview } from 'react-icons/vsc'

interface NavBtnsProps {
	pageIndex: number
	setPageIndex: (i: number) => any
	numPages: number
}

const NavBtns: React.FC<NavBtnsProps> = ({
	pageIndex,
	setPageIndex,
	numPages,
}) => {
	const submitHabit = () => {}
	return (
		<Box className='ml-auto flex gap-6'>
			<Button
				variant='ghost'
				colorScheme={'messenger'}
				disabled={pageIndex === 0}
				className='flex items-center gap-3'
				onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
			>
				<MdKeyboardArrowLeft />
				Back
			</Button>
			<Box>
				{pageIndex === numPages - 1 ? (
					<Button
						variant='ghost'
						colorScheme={'messenger'}
						className='flex gap-3'
						onClick={submitHabit}
					>
						Create
						<AiOutlinePlus />
					</Button>
				) : pageIndex < numPages - 2 ? (
					<Button
						variant='ghost'
						colorScheme={'messenger'}
						className='flex items-center gap-3'
						onClick={() => setPageIndex(Math.min(numPages - 1, pageIndex + 1))}
					>
						Next
						<MdKeyboardArrowRight />
					</Button>
				) : (
					<Button
						variant='ghost'
						colorScheme={'messenger'}
						className='flex items-center gap-3'
						onClick={() => setPageIndex(Math.min(numPages - 1, pageIndex + 1))}
					>
						Review
						<BiNotepad />
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default NavBtns
