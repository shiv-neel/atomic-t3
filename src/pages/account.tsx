import { Box, Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignInPage from "./signin";

const Account = () => {
  const Router = useRouter();
  const { data: session } = useSession();
  const handleSignOut = () => {
    console.log(`signing out ${session!.user!.email}`);
    Router.push("/");
    signOut();
  };

  const user = session?.user;
  useEffect(() => {
    if (!user) {
      Router.push("/signin");
    }
  }, [session]);

  return (
    <Box>
      {user?.name}
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Box>
  );
};

export default Account;
