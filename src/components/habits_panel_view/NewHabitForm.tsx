import {
  Box,
  Button,
  Divider,
  Input,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";
import { useAuth } from "../../server/auth/AuthContext";
import { Habit } from "../../models/Habit";
import { createNewHabit } from "../../utils/habit_resolver";

interface NewHabitFormProps {
  text: string;
  onClose: () => void;
}

const NewHabitForm: React.FC<NewHabitFormProps> = ({ text, onClose }) => {
  const user = useAuth().user;
  const [name, setName] = useState<string>("");
  const [cue, setCue] = useState<string>("");
  const [craving, setCraving] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [reward, setReward] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const key = text.toLowerCase().split(" ")[0];
  const type =
    key === "morning" ? "morning" : key === "daily" ? "daily" : "night";

  const addNewHabit = async () => {
    setLoading(true);
    if (!name) {
      setError("Name is required.");
      setLoading(false);
      return;
    }
    if (!cue) {
      setError("Cue is required.");
      setLoading(false);
      return;
    }
    if (!craving) {
      setError("Craving is required.");
      setLoading(false);
      return;
    }
    if (!response) {
      setError("Response is required.");
      setLoading(false);
      return;
    }
    if (!reward) {
      setError("Reward is required.");
      setLoading(false);
      return;
    }
    const habit: Habit = {
      uid: user!.id,
      hname: name,
      cue: cue,
      craving: craving,
      response: response,
      reward: reward,
      type: type,
    };
    const newHabitResponse: Habit | string = await createNewHabit(habit);
    if (typeof newHabitResponse === "string") {
      setError(newHabitResponse);
      setLoading(false);
      return;
    }
    setLoading(false);
    onClose();
    Router.push(`/habits/${newHabitResponse.hid}`);
  };

  return (
    <Box>
      <Box>
        <p className="mb-3 text-lg font-bold">Habit Name</p>
        <Input
          placeholder="Drink Coffee Every Morning"
          onChange={(e: any) => setName(e.target.value)}
        />
      </Box>
      <Divider mt={6} />
      <Box className="mb-6">
        <Box className="my-3">
          <p className="text-lg font-bold">Stage 1. Cue</p>
          <p>What triggers the initiation of this behavior?</p>
        </Box>
        <Input
          placeholder="Example: Your alarm goes off."
          onChange={(e: any) => setCue(e.target.value)}
        />
      </Box>
      <Box className="mb-6">
        <Box className="my-3">
          <p className="text-lg font-bold">Stage 2. Craving</p>
          <p>What are you craving to change about yourself?</p>
        </Box>
        <Input
          placeholder="Example: You want to stay alert during the day."
          onChange={(e: any) => setCraving(e.target.value)}
        />
      </Box>
      <Box className="mb-6">
        <Box className="my-3">
          <p className="text-lg font-bold">Stage 3. Response</p>
          <p>
            What <span className="font-semibold">actionable item</span> must you
            complete to satisfy this craving?
          </p>
        </Box>
        <Input
          placeholder="Example: You make yourself a cup of coffee after turning on your alarm."
          onChange={(e: any) => setResponse(e.target.value)}
        />
      </Box>
      <Box className="mb-6">
        <Box className="my-3">
          <p className="text-lg font-bold">Stage 4. Reward</p>
          <p>
            What is the cue-response connection you generate from building this
            habit?
          </p>
        </Box>
        <Input
          placeholder="Example: Drinking coffee becomes associated with waking up."
          onChange={(e: any) => setReward(e.target.value)}
        />
      </Box>
      <p className="text-red-500">{error && error}</p>
      <ModalFooter className="flex justify-center">
        <Button
          colorScheme="messenger"
          className="mr-3 flex gap-1 shadow-sm"
          onClick={addNewHabit}
          isLoading={loading}
        >
          <BsPlusLg />
          Add
        </Button>
        <Button variant="ghost" className="flex gap-1">
          <MdOutlineWatchLater />
          Stash
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default NewHabitForm;
