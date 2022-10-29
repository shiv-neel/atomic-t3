import { Box, Button, Divider, FormControl, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { InputField } from "../components/auth_view/InputField";
import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in with Github</Button>
    </>
  );
};
export default SignIn;
