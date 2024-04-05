import { Grid, GridItem, AspectRatio, Box, Center, Text, HStack, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { FinalQuizData } from "./PlayerScoreBoard";

type PanelBoardProps = {
  grid: string[][];
  handleFlipPanel: (i: number, j: number) => void;
  panelOpacity: boolean;
  changeFlipColor: boolean;
  handleRejectFlipBoard: () => void;
  finalQuizData: FinalQuizData | undefined;
  finalFlag: boolean;
  setVoiceEndFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setFinalQuizEndedFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PanelBoard({
  grid,
  handleFlipPanel,
  panelOpacity,
  changeFlipColor,
  handleRejectFlipBoard,
  finalQuizData,
  finalFlag,
  setVoiceEndFlag,
  setFinalQuizEndedFlag,
}: PanelBoardProps) {
  // パネル透明化処理
  const [opacityGrid, setOpacityGrid] = useState(
    new Array(grid.length).fill(1).map(() => new Array(grid[0].length).fill(1))
  );
  const handlePanelOpacity = (i: number, j: number): void => {
    const newOpacityGrid = [...opacityGrid];
    if (panelOpacity) {
      newOpacityGrid[i][j] = 1;
      setOpacityGrid(newOpacityGrid);
    } else {
      newOpacityGrid[i][j] = 0;
      setOpacityGrid(newOpacityGrid);
    }
  };

  const data = finalQuizData;
  const finalQuizStartVoice = new Audio("final-quiz/final-quiz-start.wav");
  const thankyou = new Audio("final-quiz/thankyou.wav");
  const finalQuizMusic = new Audio();
  const finalQuestionVoice = new Audio();
  const seikaiwa = new Audio("seikaiwa000.wav");
  const explanationVoice = new Audio();

  const [finalImagePath, setFinalImagePath] = useState("");
  const [, setImageIndex] = useState(0);

  const finalFanfare = new Audio("final-quiz/uma-fanfare.mp3");

  const audioLists = [finalQuizStartVoice, thankyou, finalQuizMusic, finalQuestionVoice, finalFanfare];
  // Keydown処理
  useEffect(() => {
    const keyActions: { [key: string]: () => void } = {
      escape: () => {
        audioLists.map((sound) => sound.pause());
        audioLists.map((sound) => (sound.currentTime = 0));
      },
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const action = keyActions[e.key.toLowerCase()];
      if (action) action();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [audioLists]);

  //イベントハンドラ
  useEffect(() => {
    if (data) {
      const finalQuizStartVoiceEnded = () => {
        finalFanfare.play();
      };

      const finalFanfareEnded = () => {
        finalQuestionVoice.src = data.basePath + data.questionVoice;
        finalQuestionVoice.play();
      };

      const finalQuestionVoiceEnded = () => {
        console.log("finalQuestionVoiceEnded: loaded");
        setVoiceEndFlag(true);
        finalQuizMusic.src = data.music;
        finalQuizMusic.volume = 0.3;
        setTimeout(() => {
          finalQuizMusic.play();
        }, 0);
        handleFinalImageChange();
      };

      const seikaiwaEnded = () => {
        finalAnswerVoice.src = data.basePath + data.answerVoice;
        finalAnswerVoice.play();
      };

      finalQuizStartVoice.addEventListener("ended", finalQuizStartVoiceEnded);
      finalFanfare.addEventListener("ended", finalFanfareEnded);
      finalQuestionVoice.addEventListener("ended", finalQuestionVoiceEnded);
      seikaiwa.addEventListener("ended", seikaiwaEnded);
      finalAnswerVoice.addEventListener("ended", () => {
        explanationVoice.src = data.basePath + data.expVoice;
        setTimeout(() => {
          explanationVoice.play();
        }, 1000);
      });

      return () => {
        finalQuizStartVoice.removeEventListener("ended", finalQuizStartVoiceEnded);
        finalFanfare.removeEventListener("ended", finalFanfareEnded);
        finalQuestionVoice.removeEventListener("ended", finalQuestionVoiceEnded);
        seikaiwa.removeEventListener("ended", seikaiwaEnded);
        finalAnswerVoice.removeEventListener("ended", () => {
          explanationVoice.src = data.basePath + data.expVoice;
          explanationVoice.play();
        });
      };
    }
  }, [finalQuizData]);

  // 画像スライド処理
  const handleFinalImageChange = () => {
    let interval: number;
    if (data) {
      setFinalImagePath(data.basePath + data.imagePath[0]);

      let cycleCount = 0; // これで2周のカウントを追跡します

      interval = setInterval(() => {
        setImageIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          // 末尾から先頭への切り替え処理
          if (nextIndex >= data.imagePath.length) {
            cycleCount++; // 1周終了時にカウントを増やす

            // 2周終了時にsetIntervalをクリア
            if (cycleCount >= 2) {
              clearInterval(interval);
              return prevIndex; // インデックスを変更しない
            }

            // 次のサイクルに入るための初期の画像をセット
            setFinalImagePath(data.basePath + data.imagePath[0]);
            return 0; // インデックスを初期化
          }

          // 通常の画像切り替え
          setFinalImagePath(data.basePath + data.imagePath[nextIndex]);
          return nextIndex; // インデックスを更新
        });
      }, 3000); // 3秒
    }

    // Escキーが押されたときのイベントリスナ
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("aaa");
        clearInterval(interval);

        const timerid = setInterval(() => {
          // ボリュームが0になったら終了
          if (finalQuizMusic.volume - 0.1 <= 0) {
            finalQuizMusic.volume = 0;
            finalQuizMusic.pause();
            clearInterval(timerid); //タイマー解除
          }
          // 0.01ずつボリュームを減らしていく
          else {
            finalQuizMusic.volume -= 0.01;
          }
        }, 100);

        document.removeEventListener("keydown", handleEscKey);
      }
    };

    // イベントリスナの追加
    document.addEventListener("keydown", handleEscKey);
  };

  // Finalの起点
  const finalQuizStartHandler = () => {
    finalQuizStartVoice.play();
  };

  let count = 0;
  const finalAnswerVoice = new Audio();

  // Answerボタンクリック時処理
  const showFinalAnswerHandler = () => {
    if (data) {
      setFinalQuizEndedFlag(true);
      setFinalImagePath(data.basePath + data.answerImagePath);

      seikaiwa.play();

      if (count > 1) {
        thankyou.play();
      }
      count += 1;
    }
  };

  // 各ファイナル画像の表示
  const finalPictureLink = data
    ? data.imagePath.slice(0, 4).map((path, index) => (
        <Button
          key={index}
          m={2}
          rounded={"full"}
          opacity={0.6}
          onClick={() => setFinalImagePath(data.basePath + path)}
        >
          {index + 1}
        </Button>
      ))
    : "";

  return (
    <>
      {data && (
        <>
          <Box position={"absolute"} top={4} zIndex={10} cursor={"pointer"}>
            <HStack onClick={() => finalQuizStartHandler()}>
              <img src="final-quiz/final-face001.png" width={"85"} />
              <Button rounded={"full"}>START!</Button>
            </HStack>
          </Box>
          <Box position={"absolute"} top={7} right={2} zIndex={10} cursor={"pointer"}>
            <HStack>
              <Box>{finalPictureLink}</Box>
              <Box onClick={() => showFinalAnswerHandler()}>
                <Button rounded={"full"} colorScheme="blackAlpha" ml={12} opacity={0.4}>
                  A
                </Button>
              </Box>
            </HStack>
          </Box>
        </>
      )}
      <Grid
        templateColumns={["repeat(5, 1fr)"]}
        gap={1}
        bgImage={finalFlag ? "url(" + finalImagePath + ")" : ""}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="contain"
      >
        {grid.map((row, i) =>
          row.map((cellColor, j) => (
            <GridItem key={`${i}-${j}`}>
              <AspectRatio ratio={4 / 3} w="100%">
                <Box
                  bg={cellColor}
                  borderWidth="2px"
                  borderColor="gray"
                  _hover={{ cursor: "crosshair", transform: "scale(1.03)" }}
                  transition={"transform 0.3s"}
                  rounded={"base"}
                  onClick={() => {
                    changeFlipColor ? handleFlipPanel(i, j) : "";
                    handlePanelOpacity(i, j);
                    !panelOpacity ? handleRejectFlipBoard() : "";
                  }}
                  opacity={opacityGrid[i][j]}
                >
                  <Center height="100%">
                    <Text fontSize={"6xl"}>{i * 5 + j + 1}</Text>
                  </Center>
                </Box>
              </AspectRatio>
            </GridItem>
          ))
        )}
      </Grid>
    </>
  );
}
