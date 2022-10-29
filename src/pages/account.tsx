import { Box, Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";
import React from "react";
import SignIn from "./signin";

const Account = () => {
  const handleSignOut = () => {
    signOut();
    Router.push("/");
  };

  const { data: session } = useSession();
  const user = session?.user;
  if (!user) return <SignIn />;
  return (
    <Box>
      {user.name}
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Box>
  );
};

export default Account;
