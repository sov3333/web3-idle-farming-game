import type { NextPage } from "next";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Container, Flex, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  const address = useAddress();

  // if not logged in, show login button
  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex direction={"column"} h={"100vh"} justifyContent={"center"}>
          <Heading my={"40px"}>Welcome to Crypto Farmer</Heading>
          <ConnectWallet />
        </Flex>
      </Container>
    )
  }

  return (
    <Container maxW={"1200px"}>
      <Heading>Crypto Farmer</Heading>
    </Container>
  );

};

export default Home;
