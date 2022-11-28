import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { trpc } from "../utils/trpc";
import SignInPage from './signin'

const Welcome = () => {
  const signInMutation = trpc.user.signUpUser.useMutation();

  const handleSignIn = () => {
    signInMutation.mutate({
      email: "shiv.neel1622@gmail.com",
      name: "Shiv Neel",
    });
  };
  return (
    <Box>
      welcome<br></br>
      <SignInPage />
      <Button onClick={handleSignIn}>test insert</Button>
    </Box>
  );
};

export default Welcome;
