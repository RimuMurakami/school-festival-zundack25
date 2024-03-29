import { useEffect, useState } from "react";
import { Stack, Box, Center, Text, Button } from "@chakra-ui/react";

export default function StandingZunda({
  isChallenge,
  onKeydownAttack,
  setOnKeydownAttack,
  onKeydownDouble,
  setOnKeydownDouble,
  finalQuizData,
  voiceEndFlag,
  finalQuizEndedFlag,
}) {
  // イベントハンドラ各種
  useEffect(() => {
    // const handleAttackChanceSoundEnded = () => {
    //   attackCanceVoice.play();
    // };
    // const handleDoubleChanceSoundEnded = () => {
    //   doubleCanceVoice.play();
    // };
    // // const handleTitleVoiceEnded = () => {
    // //   titleAudio.volume = 0.3;
    // //   setTimeout(() => {
    // //     titleAudio.play();
    // //   }, 500);
    // // };
    // attackChanceSound.addEventListener("ended", handleAttackChanceSoundEnded);
    // doubleChanceSound.addEventListener("ended", handleDoubleChanceSoundEnded);
    // // titleVoice.addEventListener("ended", handleTitleVoiceEnded);
    // return () => {
    //   attackChanceSound.removeEventListener("ended", onClickAttackButton);
    //   doubleChanceSound.removeEventListener("ended", handleDoubleChanceSoundEnded);
    //   // titleVoice.removeEventListener("ended", handleTitleVoiceEnded);
    // };
  }, []);

  const [zundaTalk, setZundaTalk] = useState("クイズとオセロの複合勝負なのだ！");

  useEffect(() => {
    if (isChallenge) {
      setZundaTalk("チャンピオンがファイナルクイズに挑戦なのだ！");
    } else {
      setZundaTalk("クイズとオセロの複合勝負なのだ！");
    }
    if (finalQuizData && voiceEndFlag) {
      setZundaTalk(finalQuizData.questionText);
    }
    if (finalQuizEndedFlag) {
      setZundaTalk(`正解は「${finalQuizData.answerText}」なのだ！`);
    }
    // console.log(zundaTalk);
  }, [isChallenge, finalQuizData, voiceEndFlag, finalQuizEndedFlag]);

  return (
    <>
      <Stack spacing={"20"} justifyContent={"space-between"}>
        <Stack spacing={6}>
          <Button
            h={120}
            rounded={"full"}
            textColor={onKeydownDouble ? "black" : ""}
            fontSize={"3xl"}
            opacity={onKeydownAttack ? "1" : "0.3"}
            bg={onKeydownAttack ? "yellow" : ""}
            onClick={() => setOnKeydownAttack(false)}
          >
            アタックチャンス
          </Button>
          {!isChallenge && (
            <Button
              h={120}
              rounded={"full"}
              textColor={onKeydownDouble ? "white" : ""}
              fontSize={"3xl"}
              opacity={onKeydownDouble ? "1" : "0.3"}
              bg={onKeydownDouble ? "blue" : ""}
              onClick={() => setOnKeydownDouble(false)}
            >
              ダブルチャンス
            </Button>
          )}
        </Stack>

        <Box>
          <Box
            minWidth={300}
            maxWidth={300}
            mr={2}
            position="relative"
            p={2}
            bg="white"
            borderRadius="md"
            borderWidth="2px"
            borderColor="gray.200"
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "12px solid white",
            }}
          >
            <Center>
              <Text fontSize={"3xl"}>{zundaTalk}</Text>
            </Center>
          </Box>
          <Box maxWidth={300}>
            <img src="zunda01.png" alt="" />
          </Box>
        </Box>
      </Stack>
    </>
  );
}
