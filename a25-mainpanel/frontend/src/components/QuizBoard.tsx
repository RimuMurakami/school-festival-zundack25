import { useState, useEffect } from "react";
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import SideScroll from "./SideScroll";
import SideScrollBottom from "./SideScrollBottom";
import PlayerScoreBoard, { FinalQuizData } from "./PlayerScoreBoard";
import StandingZunda from "./StandingZunda";
import PanelBoard from "./PanelBoard";
import SelectChallengeQuiz from "./SelectChallengeQuiz";
import FinalQuizDrawer from "./FinalQuizDrawer";

export default function QuizBoard() {
  const redColor = "red.300";
  const blueColor = "blue.300";
  const greenColor = "green.300";
  const whiteColor = "white";

  const [color, setColor] = useState(redColor);
  const [grid, setGrid] = useState<string[][]>(
    Array(5)
      .fill("white")
      .map(() => Array(5).fill("white"))
  );

  const [isChallenge, setIsChallenge] = useState(false);
  const [panelOpacity, setPanelOpacity] = useState(true);
  const [changeFlipColor, setChangeFlipColor] = useState(true);
  const [onKeydownAttack, setOnKeydownAttack] = useState(false);
  const [onKeydownDouble, setOnKeydownDouble] = useState(false);

  const [finalQuizData, setFinalQuizData] = useState<FinalQuizData | undefined>();
  const [finalFlag, setFinalFlag] = useState(false);
  const [voiceEndFlag, setVoiceEndFlag] = useState(false);

  const [finalQuizEndedFlag, setFinalQuizEndedFlag] = useState(false);

  console.log(grid);

  const titleAudio = new Audio("audios/opening-bgm.mp3");
  const quizOcello = new Audio("voices/zunda001.wav");
  const titleVoice = new Audio("voices/game-start.wav");

  const cardFlip = new Audio("sounds/card-flip.mp3");
  const rejectCardFlip = new Audio("sounds/reject-card-flip.mp3");

  const attackChanceSound = new Audio("sounds/attack-chance.mp3");
  const attackChanceVoice = new Audio("voices/attack-chance-voice.wav");
  const attackChanceCardFlip = new Audio("sounds/attack-card-flip.mp3");

  const doubleChanceSound = new Audio("sounds/double-chance.mp3");
  const doubleCanceVoice = new Audio("voices/double-chance-voice.wav");

  const sounds = [
    titleAudio,
    quizOcello,
    titleVoice,
    cardFlip,
    rejectCardFlip,
    attackChanceSound,
    attackChanceVoice,
    attackChanceCardFlip,
    doubleChanceSound,
    doubleCanceVoice,
  ];

  type Keys = "1" | "2" | "3" | "4" | "5" | "6" | "q" | "w" | "escape";

  // keydown処理
  useEffect(() => {
    const keyActions = {
      1: () => {
        setColor(redColor);
        setChangeFlipColor(true);
      },
      2: () => {
        setColor(blueColor);
        setChangeFlipColor(true);
      },
      3: () => {
        setColor(greenColor);
        setChangeFlipColor(true);
      },
      4: () => {
        setColor(whiteColor);
        setChangeFlipColor(true);
      },
      5: () => {
        setPanelOpacity(false);
        setChangeFlipColor(false);
      },
      6: () => {
        setPanelOpacity(true);
        setChangeFlipColor(false);
      },
      q: () => {
        // TODO アタック演出
        alert("アタックチャンス");
        attackChanceSound.play();
        setOnKeydownAttack(true);
      },
      w: () => {
        // TODO ダブルチャンス演出
        alert("ダブルチャンス");
        doubleChanceSound.play();
        setOnKeydownDouble(true);
      },
      escape: () => {
        sounds.map((sound) => sound.pause());
        sounds.map((sound) => (sound.currentTime = 0));
      },
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const key: Keys = e.key.toLowerCase() as Keys;
      const action = keyActions[key];
      if (action) action();
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // 開始処理 *開発時はコメントアウト*
  // useEffect(() => {
  //   titleVoice.play();

  //   const catchCopy = new Audio("catch-copy001.wav");

  //   titleVoice.addEventListener("ended", () => {
  //     setTimeout(() => {
  //       catchCopy.play();
  //     }, 7000);
  //   });

  //   // オーディオの再生が終了したときやコンポーネントがアンマウントされたときにオーディオを停止するためのクリーンアップを提供する
  //   return () => {
  //     titleVoice.pause();
  //     titleVoice.removeEventListener("ended", () => catchCopy.play());
  //   };
  // }, []);

  // イベントハンドラ各種
  useEffect(() => {
    const handleAttackChanceSoundEnded = () => {
      setTimeout(() => {
        attackChanceVoice.play();
      }, 300);
    };

    const handleDoubleChanceSoundEnded = () => {
      setTimeout(() => {
        doubleCanceVoice.play();
      }, 300);
    };

    const handleTitleVoiceEnded = () => {
      titleAudio.volume = 0.3;
      setTimeout(() => {
        titleAudio.play();
      }, 500);
    };

    attackChanceSound.addEventListener("ended", handleAttackChanceSoundEnded);
    doubleChanceSound.addEventListener("ended", handleDoubleChanceSoundEnded);
    titleVoice.addEventListener("ended", handleTitleVoiceEnded);

    return () => {
      attackChanceSound.removeEventListener("ended", handleAttackChanceSoundEnded);
      doubleChanceSound.removeEventListener("ended", handleDoubleChanceSoundEnded);
      titleVoice.removeEventListener("ended", handleTitleVoiceEnded);
    };
  }, []);

  // 消失時効果音
  const handleRejectFlipBoard = () => {
    rejectCardFlip.play();
  };

  // クリック時効果音
  const handleOnClickFlipBoard = () => {
    cardFlip.play();
  };
  // フリップ色変換処理
  const handleOnClick = (i: number, j: number) => {
    const newGrid = [...grid];
    newGrid[i][j] = color;
    setGrid(newGrid);
  };

  // TODO: オセロ機能の実装
  const handleFlipPanel = (i: number, j: number) => {
    console.log("onclicked");
    // if (color === whiteColor) {
    //   grid[i][j] = whiteColor;
    //   return;
    // }

    // if (grid[i][j] !== whiteColor) {
    //   return;
    // }
    handleOnClickFlipBoard();
    handleOnClick(i, j);
  };

  // 各色パネル数計算処理 前後入れ替え禁止
  const countColor = (targetColor: string) => {
    return grid.flat().filter((color) => color === targetColor).length;
  };
  const colorCounts = {
    red: countColor(redColor),
    green: countColor(greenColor),
    blue: countColor(blueColor),
  };

  const boxWidth = useBreakpointValue({ base: "100%" });

  // ファイナルクイズデータ取得処理
  const fetchQuizData = async (type: string, id: string) => {
    try {
      const response = await fetch(`http://localhost:4444/${type}/${id}`);
      const data = await response.json();
      console.log(data);
      setFinalQuizData(data);
      console.log("fetchQuizData: fetched!");
    } catch (error) {
      console.error("Failed fetching quiz data:", error);
    }
  };

  return (
    <>
      {isChallenge && <FinalQuizDrawer fetchQuizData={fetchQuizData} />}
      <Grid
        templateAreas={`"header header header"
                  "nav main standingZunda"
                  "footer footer footer"`}
        gridTemplateRows={"auto 1fr auto"}
        gridTemplateColumns={"auto 1fr auto"}
        color="blackAlpha.700"
        fontWeight="bold"
        bg={"orange.50"}
      >
        <GridItem area={"header"}>
          <SideScroll finalFlag={finalFlag} onKeydownAttack={onKeydownAttack} />
        </GridItem>
        <GridItem bg="orange.50" area={"nav"} borderRight={"1px"} borderColor={"orange.100"}>
          <PlayerScoreBoard colorCounts={colorCounts} color={color} finalQuizData={finalQuizData} />
        </GridItem>
        <GridItem p="2" bg="orange.50" area={"main"}>
          <Flex alignItems={"flex-end"} justifyContent={"center"}>
            <Box p={1} w={boxWidth} maxWidth={1200}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PanelBoard
                      grid={grid}
                      handleFlipPanel={handleFlipPanel}
                      panelOpacity={panelOpacity}
                      changeFlipColor={changeFlipColor}
                      handleRejectFlipBoard={handleRejectFlipBoard}
                      finalQuizData={finalQuizData}
                      finalFlag={finalFlag}
                      setVoiceEndFlag={setVoiceEndFlag}
                      setFinalQuizEndedFlag={setFinalQuizEndedFlag}
                    />
                  }
                />
                <Route
                  path="select-challenge-quiz"
                  element={<SelectChallengeQuiz setIsChallenge={setIsChallenge} setFinalFlag={setFinalFlag} />}
                />
              </Routes>
            </Box>
          </Flex>
        </GridItem>
        <GridItem area={"standingZunda"} borderLeft={"1px"} borderColor={"orange.100"} p={3}>
          <Box>
            <StandingZunda
              isChallenge={isChallenge}
              onKeydownAttack={onKeydownAttack}
              setOnKeydownAttack={setOnKeydownAttack}
              onKeydownDouble={onKeydownDouble}
              setOnKeydownDouble={setOnKeydownDouble}
              finalQuizData={finalQuizData}
              voiceEndFlag={voiceEndFlag}
              finalQuizEndedFlag={finalQuizEndedFlag}
            />
          </Box>
        </GridItem>
        <GridItem area={"footer"}>
          <SideScrollBottom finalFlag={finalFlag} onKeydownAttack={onKeydownAttack} />
        </GridItem>
      </Grid>
    </>
  );
}
