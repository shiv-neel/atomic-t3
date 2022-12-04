import { Box } from '@chakra-ui/react'
import React from 'react'
import { FormInputProps } from './TextInput'

interface BooleanFormInputProps extends FormInputProps {
	trueValue: string
	falseValue: string
}
const BooleanInput: React.FC<BooleanFormInputProps> = ({
	label,
	value,
	action,
	description,
	trueValue,
	falseValue,
}) => {
	return <Box></Box>
}

export default BooleanInput
