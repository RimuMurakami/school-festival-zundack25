import { VStack, Box, Center, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "/zunda-mike0002.png";
import finalZunda from "/final-quiz/final-zunda001.png";

export default function PlayerScoreBoard({ colorCounts, color, setIsChallenge, finalQuizData }) {
  const { red, green, blue } = colorCounts;
  const focusFrame = {
    border: "1px",
    rounded: "full",
    px: 3,
  };

  let onColorRed = "";
  let onColorBlue = "";
  let onColorGreen = "";
  onColorRed = color === "red.300" ? focusFrame : "";
  onColorBlue = color === "blue.300" ? focusFrame : "";
  onColorGreen = color === "green.300" ? focusFrame : "";

  return (
    <VStack p={5}>
      <Box mx={2} w={"100%"} maxW={280}>
        {/* <Image src={finalQuizData ? finalZunda : logo} onClick={() => setIsChallenge(false)} alt="" w={10000} /> */}
        <Image src={finalQuizData ? finalZunda : logo} alt="" />
      </Box>
      <Box>
        <Center>
          <Box mb={1} fontSize={40} color={"red"} {...onColorRed} value={"red.300"}>
            赤プレイヤー
          </Box>
        </Center>
        <Box bgColor={"red.300"} width={80} height={36} rounded={"full"} boxShadow={"2xl"}>
          <Center>
            <Text fontSize={"8xl"}>{red}</Text>
          </Center>
        </Box>
      </Box>
      <Box>
        <Center>
          <Box mb={1} fontSize={40} color={"blue"} {...onColorBlue}>
            青プレイヤー
          </Box>
        </Center>
        <Box bgColor={"blue.300"} width={80} height={36} rounded={"full"} boxShadow={"2xl"}>
          <Center>
            <Text fontSize={"8xl"}>{blue}</Text>
          </Center>
        </Box>
      </Box>
      <Box>
        <Center>
          <Box mb={1} fontSize={40} color={"green"} {...onColorGreen}>
            緑プレイヤー
          </Box>
        </Center>
        <Box bgColor={"green.300"} width={80} height={36} rounded={"full"} boxShadow={"2xl"}>
          <Center>
            <Text fontSize={"8xl"}>{green}</Text>
          </Center>
        </Box>
      </Box>
    </VStack>
  );
}
