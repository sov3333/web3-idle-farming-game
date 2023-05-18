import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import { FARMER_ADDRESS } from "../const/addresses";

export function ClaimFarmer() {
    const { contract } = useContract(FARMER_ADDRESS);
    const { data: metadata } = useContractMetadata(contract);

    // console.log(metadata)

    return (
        <Container maxW={"1200px"}>
            <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} h={"50vh"}>
                <Heading>Claim Farmer to start farming</Heading>
                <Box borderRadius={"8px"} overflow={"hidden"} my={10}>
                    <MediaRenderer
                        src='/images/farmer.png'
                        // src={metadata?.image}
                        height="300px"
                        width="300px"
                    />
                </Box>

                <Web3Button
                    contractAddress={FARMER_ADDRESS}
                    action={(contract) => contract.erc1155.claim(0, 1)}
                >Claim Farmer</Web3Button>
            </Flex>
        </Container>
    );
}