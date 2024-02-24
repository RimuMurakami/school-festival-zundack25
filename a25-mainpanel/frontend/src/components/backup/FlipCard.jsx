import { Box, Flex, Text, useBoolean } from "@chakra-ui/react";
import { useState } from "react";

function FlipCard() {
  const [isFlipped, setIsFlipped] = useBoolean(true);

  return (
    <Flex justify="center" align="center" height="100vh">
      <Box
        w="200px"
        h="300px"
        onClick={setIsFlipped.toggle}
        position="relative"
        transformStyle="preserve-3d"
        transition="transform 0.6s"
        transform={`rotateY(${isFlipped ? "180deg" : "0deg"})`}
      >
        {/* Card Front */}
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blue.500"
          justify="center"
          align="center"
          backfaceVisibility="hidden"
        >
          <Text fontSize="xl" color="white">
            Front
          </Text>
        </Flex>

        {/* Card Back */}
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="red.500"
          justify="center"
          align="center"
          transform="rotateY(180deg)"
          backfaceVisibility="hidden"
        >
          <Text fontSize="xl" color="white">
            Back
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FlipCard;
