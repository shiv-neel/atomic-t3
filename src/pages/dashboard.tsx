import { Box, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { trpc } from "../utils/trpc";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  const insertHistory = trpc.history.createFirstHistory.useMutation();

  const handleInsertHistory = async () => {};
  return (
    <Box>
      <Button onClick={handleInsertHistory}>insert history</Button>
    </Box>
  );
};

export default Dashboard;
