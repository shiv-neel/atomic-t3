import { Box, Button, useColorMode } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import Router from "next/router";
import React from "react";
import { VscSignOut } from "react-icons/vsc";
import { useAuth } from "../../server/auth/AuthContext";
import DataRow from "./DataRow";

interface PersonalInformationProps {
  user: User | null;
  fname: string;
  lname: string;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  user,
  fname,
  lname,
}) => {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    await signOut();
    Router.push("/signin");
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const bgc =
    colorMode === "light" ? "hover:bg-slate-50" : "hover:bg-slate-900";
  return (
    <Box>
      <p className="mb-8 text-2xl font-bold">Personal Information</p>
      <Box className="mt-12 flex flex-col gap-5">
        <DataRow key_="First Name" value={fname} />
        <DataRow key_="Last Name" value={lname} />
        <DataRow key_="Email" value={user?.email || ""} />
        <DataRow key_="Password" value={""} />
      </Box>
      <Button
        onClick={handleSignOut}
        className="my-6"
        variant="outline"
        colorScheme={"messenger"}
      >
        <VscSignOut />
        Sign Out
      </Button>
    </Box>
  );
};

export default PersonalInformation;
