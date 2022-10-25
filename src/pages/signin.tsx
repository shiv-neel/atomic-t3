import { Box, Button, Divider, FormControl, Heading } from "@chakra-ui/react";
import { Form, Formik, FormikErrors } from "formik";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useAuth } from "../server/auth/AuthContext";
import { InputField } from "../components/auth_view/InputField";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { user, signUp, signIn, signOut } = useAuth();

  const handleSignIn = async (): Promise<void> => {
    setError("");
    console.log("signing in");
    setLoading(true);
    const signInAttempt = await signIn(email, password);
    if (typeof signInAttempt === "string") {
      setError(signInAttempt + "!");
      setLoading(false);
      return;
    }
    setLoading(false);
    Router.push("/");
  };

  return (
    <Box w={"lg"} className="border-1 mx-auto flex flex-col justify-center p-5">
      <Heading as="h1" className="flex justify-center">
        Sign In
      </Heading>
      <Divider my={5} />
      <FormControl>
        <InputField
          name="email"
          placeholder="Enter e-mail address"
          label="E-mail"
          type="email"
          setState={setEmail}
        />
        <InputField
          name="password"
          placeholder="Enter password"
          label="Password"
          type="password"
          setState={setPassword}
        />
        <p className="font-bold text-red-500">{error && error}</p>
        <Button
          my={4}
          type="submit"
          isLoading={isLoading}
          colorScheme={"messenger"}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </FormControl>
      <p>
        Don&apos;t have an account yet?{" "}
        <Link href="/signup" passHref>
          <a className="underline">Sign Up</a>
        </Link>
      </p>
    </Box>
  );
};
export default SignIn;
