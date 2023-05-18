import type { NextPage } from "next";
import { ConnectWallet, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { Container, Flex, Heading, Spinner } from "@chakra-ui/react";
import { FARMER_ADDRESS, TOOLS_ADDRESS, REWARDS_ADDRESS, STAKING_ADDRESS } from "../const/addresses";
import { ClaimFarmer } from "../components/ClaimFarmer";

const Home: NextPage = () => {
  const address = useAddress();

  // setup all contracts
  const { contract: farmerContract } = useContract(FARMER_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: rewardsContract } = useContract(REWARDS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  // check owned nfts from the farmer contract
  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(farmerContract, address)

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

  // if loading, show loading
  if (loadingOwnedFarmers) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    )
  }

  // if user has no farmer, show claim farmer button
  if (ownedFarmers?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimFarmer />
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
