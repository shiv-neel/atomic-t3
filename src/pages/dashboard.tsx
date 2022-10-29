import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import SignIn from "./signin";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <Box>
      {session ? <Box>Signed in as {session.user!.name}</Box> : <SignIn />}
    </Box>
  );
};

export default Dashboard;
