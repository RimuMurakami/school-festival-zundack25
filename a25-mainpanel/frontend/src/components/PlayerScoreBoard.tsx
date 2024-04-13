import { VStack, Box, Center, Text, Image } from "@chakra-ui/react";

const logo = "/zunda-mike0002.png";
const finalZunda = "/final-quiz/final-zunda001.png";

export type FinalQuizData = {
  id: string;
  basePath: string;
  questionText: string;
  questionVoice: string;
  answerText: string;
  answerVoice: string;
  explanation: string;
  expVoice: string;
  answerImagePath: string;
  imagePath: string[];
  music: string;
  difficulty: string;
};

type PlayerScoreBoardProps = {
  colorCounts: {
    red: number;
    green: number;
    blue: number;
  };
  color: string;
  finalQuizData: FinalQuizData | undefined;
};

export default function PlayerScoreBoard({ colorCounts, color, finalQuizData }: PlayerScoreBoardProps) {
  const { red, green, blue } = colorCounts;
  const focusFrame = {
    border: "1px",
    rounded: "full",
    px: 3,
  };

  let onColorRed = {};
  let onColorBlue = {};
  let onColorGreen = {};
  onColorRed = color === "red.300" ? focusFrame : {};
  onColorBlue = color === "blue.300" ? focusFrame : {};
  onColorGreen = color === "green.300" ? focusFrame : {};

  return (
    <VStack>
      {/* <Box>
        <Image src={finalQuizData ? finalZunda : logo} alt="zunda-mike" />
      </Box> */}
      <Box w={"100%"}>
        <Box mb={1} fontSize={40} color={"red"} {...onColorRed}>
          <Center>赤プレイヤー</Center>
        </Box>
        <Box bgColor={"red.300"} rounded={"full"} boxShadow={"2xl"}>
          <Center fontSize={"8xl"}>{red}</Center>
        </Box>
      </Box>
      <Box w={"100%"}>
        <Box mb={1} fontSize={40} color={"blue"} {...onColorBlue}>
          <Center>青プレイヤー</Center>
        </Box>
        <Box bgColor={"blue.300"} rounded={"full"} boxShadow={"2xl"}>
          <Center>
            <Text fontSize={"8xl"}>{blue}</Text>
          </Center>
        </Box>
      </Box>
      <Box w={"100%"}>
        <Box mb={1} fontSize={40} color={"green"} {...onColorGreen}>
          <Center>緑プレイヤー</Center>
        </Box>
        <Box bgColor={"green.300"} rounded={"full"} boxShadow={"2xl"}>
          <Center>
            <Text fontSize={"8xl"}>{green}</Text>
          </Center>
        </Box>
      </Box>
    </VStack>
  );
}
