import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Dashboard from "./dashboard";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  if (user) {
    return <Dashboard />;
  }

  return <></>;
};

export default Home;
