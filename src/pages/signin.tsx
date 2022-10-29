import { Box, Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";
import React, { useEffect } from "react";
import { BsGithub } from "react-icons/bs";
import { trpc } from "../utils/trpc";

const SignInPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const lastLoginUpdateMutation = trpc.user.updateLastLogin.useMutation();
  const firstLoginMutation = trpc.user.signUpUser.useMutation();

  useEffect(() => {
    if (session && session.user) {
      lastLoginUpdateMutation.mutate({ email: session.user.email! });
      Router.push("/dashboard");
    }
  }, [session]);

  const handleSignIn = () => {
    signIn();
    if (session && session.user) {
      const thisUser = trpc.user.getUserById.useQuery({
        email: session.user.email!,
      });
      if (!thisUser) {
        console.log("here");
        firstLoginMutation.mutate({
          email: session.user.email!,
          name: session.user.name!,
        });
      }
      Router.push("/dashboard");
    }
  };

  return (
    <>
      Not signed in <br />
      <Button onClick={handleSignIn}>Sign in with Github</Button>
    </>
  );
};

export default SignInPage;
