import { Button, Stack, HStack, Box, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SelectChallengeQuizProps = {
  setIsChallenge: React.Dispatch<React.SetStateAction<boolean>>;
  setFinalFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectChallengeQuiz({ setIsChallenge, setFinalFlag }: SelectChallengeQuizProps) {
  const [blinkingButton, setBlinkingButton] = useState<number>();
  const navigate = useNavigate();

  const genreSelect = new Audio("final-quiz/genre-select.mp3");

  const isSelected = {
    border: "8px",
    borderColor: "orange.300",
  };

  // 点滅アニメーションの定義
  const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.1; }
    100% { opacity: 1; }
  `;

  const genres = ["アニメ", "地理", "世界遺産", "スポーツ"];

  const FinalListsGenre = genres.map((genre, index) => (
    <Button
      key={index}
      fontSize={"7xl"}
      p={"100"}
      h={320}
      rounded={"full"}
      _hover={isSelected}
      animation={blinkingButton === index ? `${blink} 0.5s 4` : "none"} // アニメーションの適用
      onClick={() => handleButtonClick(index)}
    >
      {genre}
    </Button>
  ));

  const handleButtonClick = (index: number) => {
    setFinalFlag(true);
    genreSelect.play();
    setBlinkingButton(index);
    setTimeout(() => {
      setBlinkingButton(-1);
      navigate("/");
    }, 2000); // 2秒後に点滅を停止
  };

  useEffect(() => {
    setIsChallenge(true);
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="70dvh">
        <Stack justify={"center"} spacing={20} mt={24}>
          <HStack justifyContent={"center"} spacing={20}>
            {FinalListsGenre[0]}
            {FinalListsGenre[1]}
          </HStack>
          <HStack justifyContent={"center"} spacing={12}>
            {FinalListsGenre[2]}
            {FinalListsGenre[3]}
          </HStack>
        </Stack>
      </Box>
    </>
  );
}
