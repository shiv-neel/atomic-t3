import {
  Box,
  Button,
  Divider,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BsEraser, BsEraserFill } from "react-icons/bs";
import { VscSignOut } from "react-icons/vsc";
import { useAuth } from "../../server/auth/AuthContext";
import { getBackgroundHoverColor } from "../../styles/theme";
import { deleteHabitAndHabitHistory } from "../../utils/habit_resolver";
import { supabase } from "../../utils/supabase";
import DataRow from "./DataRow";
import DeleteForm from "./DeleteForm";

const SecurityAndPrivacy = () => {
  const { user, signUp, signIn, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    Router.push("/signin");
  };

  const {
    isOpen: isDeleteDataOpen,
    onOpen: onDeleteDataOpen,
    onClose: onDeleteDataClose,
  } = useDisclosure();

  const deleteData = async () => {
    setLoading(true);
    const { data: hids, error } = await supabase
      .from("habits")
      .select("hid")
      .eq("uid", user!.id!);
    console.log(hids);
    if (error || !hids) {
      console.log(error);
      return;
    }
    for (let i = 0; i < hids.length; i++) {
      await deleteHabitAndHabitHistory(hids[i].hid);
    }
    setLoading(false);
    onDeleteDataClose();
  };

  const {
    isOpen: isDeleteAccountOpen,
    onOpen: onDeleteAccountOpen,
    onClose: onDeleteAccountClose,
  } = useDisclosure();

  const deleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    await deleteData();
    setLoading(false);
    onDeleteAccountClose();
    await handleSignOut();
    await supabase.from("public_users").delete().match({ email: user.email! });
    await supabase.auth.api.deleteUser(user.id);
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const bgc =
    colorMode === "light" ? "hover:bg-slate-50" : "hover:bg-slate-900";

  return (
    <Box>
      <p className="mb-8 text-2xl font-bold">Security and Privacy</p>
      <Box className="mt-12 flex flex-col gap-3">
        <Box
          className={`rounded-md p-3 ${bgc} cursor-pointer`}
          onClick={onDeleteDataOpen}
        >
          <Box className="mb-2 flex items-center gap-2 text-lg font-bold text-red-600">
            <BsEraserFill />
            Clear My Data
          </Box>
          <Box className="text-sm text-blue-500">
            <span className="font-bold">Permanently erase all habit data.</span>{" "}
            <br></br>
            You&#39;ll still have access to your account, but all habits and
            their data will be deleted. This action cannot be undone.
          </Box>
        </Box>
        <DeleteForm
          isOpen={isDeleteDataOpen}
          onOpen={onDeleteDataOpen}
          onClose={onDeleteDataClose}
          deleteStuff={deleteData}
          whichStuff="data"
          loading={loading}
        />
        <Box
          className={`rounded-md p-3 ${bgc} cursor-not-allowed opacity-50`}
          onClick={onDeleteAccountOpen}
        >
          <Box className="mb-2 flex items-center gap-2 text-lg font-bold text-red-600">
            <AiOutlineUserDelete />
            Delete Account (Coming Soon)
          </Box>
          <Box className="text-sm text-blue-500">
            <span className="font-bold">Permanently delete your account.</span>{" "}
            <br></br>
            You will no longer have access to your account, habits, or habit
            data. This action cannot be undone.
          </Box>
        </Box>
        {/* <DeleteForm
					isOpen={isDeleteAccountOpen}
					onOpen={onDeleteAccountOpen}
					onClose={onDeleteAccountClose}
					deleteStuff={deleteAccount}
					whichStuff='account'
					loading={loading}
				/> */}
        <Divider />
      </Box>
    </Box>
  );
};

export default SecurityAndPrivacy;
