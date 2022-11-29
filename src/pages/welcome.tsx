import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { trpc } from "../utils/trpc";
import SignInPage from './signin'

const Welcome = () => {
  const signInMutation = trpc.user.signUpUser.useMutation();

  return (
		<Box>
			welcome<br></br>
			<SignInPage />
		</Box>
	)
};

export default Welcome;
