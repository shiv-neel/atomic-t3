import { Box, Textarea } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

interface PostitNoteProps {
	header: string
	value: string
	action: (e: string) => any
	example?: string
	description?: string
}

const PostitNote: React.FC<PostitNoteProps> = ({
	header,
	value,
	action,
	example,
	description,
}) => {
	const dispatch = useDispatch()
	return (
		<Box
			className='flex h-full w-48 cursor-pointer flex-col items-center justify-start rounded-sm p-4 text-black shadow-lg duration-75 hover:shadow-xl'
			bg='yellow.100'
			fontFamily={'handwriting'}
		>
			<Box className='mb-4 text-xl font-semibold'>{header}</Box>
			<Textarea
				variant='unstyled'
				onChange={(e) => dispatch(action(e.target.value))}
				value={value}
				placeholder={example}
				overflow='hidden'
				resize='none'
			/>
		</Box>
	)
}

export default PostitNote
