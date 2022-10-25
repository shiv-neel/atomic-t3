import {
  Box,
  Button,
  Heading,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Title from "./habits_panel_view/Title";
import { Habit } from "../models/Habit";
import HabitSummaryCard from "./habits_panel_view/HabitSummaryCard";
import { BsCloudSun, BsPlusLg } from "react-icons/bs";
import { IoCloudyNightOutline } from "react-icons/io5";
import { AiOutlineCalendar } from "react-icons/ai";
import { useAuth } from "../server/auth/AuthContext";
import LoadingComponent from "./LoadingComponent";
import NewHabitModal from "./habits_panel_view/NewHabitModal";

const HabitsPanelView = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const {
    isOpen: isMorningOpen,
    onOpen: onMorningOpen,
    onClose: onMorningClose,
  } = useDisclosure();
  const {
    isOpen: isDailyOpen,
    onOpen: onDailyOpen,
    onClose: onDailyClose,
  } = useDisclosure();
  const {
    isOpen: isNightOpen,
    onOpen: onNightOpen,
    onClose: onNightClose,
  } = useDisclosure();

  const user = useAuth().user;
  // useEffect(() => {
  // 	const getHabits = async () => {
  // 		if (!user) return
  // 		const { data, error } = await supabase
  // 			.from('habits')
  // 			.select('*')
  // 			.eq('uid', user!.id)
  // 		if (error) return
  // 		setHabits(data)
  // 	}
  // 	getHabits()
  // }, [])

  const { colorMode } = useColorMode();
  const bgc = colorMode === "light" ? "bg-gray-50" : "bg-gray-900";

  return (
    <Box
      className={`flex w-72 flex-col items-center justify-between rounded-md p-4 shadow-md ${bgc} bg-sl`}
    >
      <Heading as="h2" size="md" className="w-full justify-start">
        Habits
      </Heading>
      <Title text="Morning Habit Stack" icon={<BsCloudSun />} />
      <Box>
        {habits ? (
          habits
            .filter((habit) => habit.type === "morning")
            .map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
        ) : (
          <LoadingComponent />
        )}
      </Box>
      <Button
        className="w-full shadow-md"
        variant="outline"
        onClick={onMorningOpen}
      >
        <BsPlusLg />
      </Button>
      <NewHabitModal
        isOpen={isMorningOpen}
        onClose={onMorningClose}
        text="Morning Habit Stack"
      />
      <Title text="Daily Habit Stack" icon={<AiOutlineCalendar />} />
      <Box>
        {habits ? (
          habits
            .filter((habit) => habit.type === "daily")
            .map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
        ) : (
          <LoadingComponent />
        )}
      </Box>
      <Button
        className="w-full shadow-md"
        variant="outline"
        onClick={onDailyOpen}
      >
        <BsPlusLg />
      </Button>
      <NewHabitModal
        isOpen={isDailyOpen}
        onClose={onDailyClose}
        text="Daily Habit Stack"
      />
      <Title text="Nighttime Habit Stack" icon={<IoCloudyNightOutline />} />
      <Box>
        {habits ? (
          habits
            .filter((habit) => habit.type === "night")
            .map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
        ) : (
          <LoadingComponent />
        )}
      </Box>
      <Button
        className="w-full shadow-md"
        variant="outline"
        onClick={onNightOpen}
      >
        <BsPlusLg />
      </Button>
      <NewHabitModal
        isOpen={isNightOpen}
        onClose={onNightClose}
        text="Nighttime Habit Stack"
      />
    </Box>
  );
};

export default HabitsPanelView;
