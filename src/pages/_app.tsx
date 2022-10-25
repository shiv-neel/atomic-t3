// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { theme } from "../styles/theme";
import { SessionProvider } from "next-auth/react";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: any) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
