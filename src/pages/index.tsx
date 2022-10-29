import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Dashboard from "./dashboard";
import SignIn from "./signin";

const Home: NextPage = () => {
  const habit = trpc.habit.getHabitByHid.useQuery({ hid: "asdf" });
  console.log(habit.data);

  const { data: session, status } = useSession();

  return <Box>{session ? <Dashboard /> : <SignIn />}</Box>;
};

export default Home;
