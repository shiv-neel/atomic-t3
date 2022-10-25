import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const habit = trpc.habit.getHabitByHid.useQuery({ hid: "asdf" });
  console.log(habit.data);

  return <></>;
};

export default Home;
