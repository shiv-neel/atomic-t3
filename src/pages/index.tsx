import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Dashboard from "./dashboard";
import SignIn from "./signin";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  if (user) {
    return <Dashboard />;
  }

  return <Box>{session ? <Dashboard /> : <SignIn />}</Box>;
};

export default Home;
