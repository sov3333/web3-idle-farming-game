import type { NextPage } from "next";
import { ConnectWallet, MediaRenderer, useAddress, useContract, useContractRead, useOwnedNFTs } from "@thirdweb-dev/react";
import { Box, Card, Container, Flex, Heading, SimpleGrid, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { FARMER_ADDRESS, TOOLS_ADDRESS, REWARDS_ADDRESS, STAKING_ADDRESS } from "../const/addresses";
import { ClaimFarmer } from "../components/ClaimFarmer";
import { BigNumber, ethers } from "ethers";
import { Inventory } from "../components/Inventory";
import { Equipped } from "../components/Equipped";

const Home: NextPage = () => {
  const address = useAddress();

  // setup all contracts
  const { contract: farmerContract } = useContract(FARMER_ADDRESS);
  const { contract: toolsContract } = useContract(TOOLS_ADDRESS);
  const { contract: rewardsContract } = useContract(REWARDS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  // get player's nfts and tokens
  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(farmerContract, address)
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(toolsContract, address)
  const { data: equippedTools } = useContractRead(stakingContract, "getStakeInfo", [address])
  const { data: rewardsBalance } = useContractRead(rewardsContract, "balanceOf", [address])

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
      <SimpleGrid columns={2} spacing={10}>
        <Card p={5}>
          <Heading>Farmer:</Heading>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              {ownedFarmers?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer
                    src={nft.metadata.image}
                    height="100%"
                    width="100%"
                  />
                </div>
              ))}
            </Box>
            <Box>
              <Text fontSize={"small"} fontWeight={"bold"}>$CARROT Balance:</Text>
              {rewardsBalance && (
                <p>{ethers.utils.formatUnits(rewardsBalance, 18)}</p>
              )}
            </Box>
          </SimpleGrid>
        </Card>
        <Card p={5}>
          <Heading>Inventory:</Heading>
          <Skeleton isLoaded={!loadingOwnedTools}>
            <Inventory nft={ownedTools} />
          </Skeleton>
        </Card>
      </SimpleGrid>
      <Card p={5} mt={10}>
        <Heading mb={"30px"}>Equipped Tools:</Heading>
        <SimpleGrid columns={4} spacing={10}>
          {equippedTools &&
            equippedTools[0].map((nft: BigNumber) => (
              <Equipped key={nft.toNumber()} tokenId={nft.toNumber()} />
            ))
          }
        </SimpleGrid>
      </Card>
    </Container>
  );

};

export default Home;
