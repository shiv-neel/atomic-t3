import { Box, Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { BsGithub } from "react-icons/bs";

const SignIn = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    console.log(session);
    return (
      <>
        Signed in as {session.user.name} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  } else
    return (
      <>
        Not signed in <br />
        <Button onClick={() => signIn()}>Sign in with Github</Button>
      </>
    );
};

export default SignIn;
