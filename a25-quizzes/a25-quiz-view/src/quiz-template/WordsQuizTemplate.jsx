import { useEffect, useState } from "react";
import { Text, Box, Stack, Center, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import FastestPush from "../components/FastestPush";

export default function WordsQuizTemplate({ isFocused }) {
  const [flag, setFlag] = useState(true);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //URL paramsからデータを取得。美しくないが一応機能要件は満たせる
  //追記 jsonserverからfetchがうまくいったので、ここからはtypeとidのみ取得する
  const search = useLocation().search;
  const paramsData = new URLSearchParams(search);
  const type = paramsData.get("type");
  const id = paramsData.get("id");

  const fetchQuizData = async (type, id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3333/${type}/${id}`);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed fetching quiz data:", error);
      setError(false);
      setIsLoading(false);
    }
  };

  let jajan = new Audio("jajan001.mp3");
  let mondaidesu = new Audio("mondaidesu001.wav");
  let thinkingAudio = new Audio("thinking001.mp3");
  let success = new Audio("success001.mp3");
  let miss = new Audio("miss001.mp3");
  let seikaiwa = new Audio("seikaiwa000.wav");

  let questionVoice = new Audio();
  let answerVoice = new Audio();

  let sounds = [jajan, mondaidesu, thinkingAudio, success, miss, seikaiwa, questionVoice, answerVoice];

  // JSON-Serverから当該クイズデータを取得
  useEffect(() => {
    fetchQuizData(type, id);
  }, [type, id]);

  // keydown処理
  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case "q":
        case "Q":
          questionVoice.src = data.questionVoice;

          setTimeout(() => {
            jajan.play();
          }, 500);
          jajan.addEventListener("ended", () => {
            mondaidesu.play();
          });
          // 「mondaiwaとjajan」オーディオの再生が終了したら、「問題文」のオーディオを再生
          mondaidesu.addEventListener("ended", () => {
            setTimeout(() => {
              questionVoice.play();
            }, 800);
          });
          // 「問題文」終了後、thinkingAudioを流し、問題文を表示
          questionVoice.addEventListener("ended", () => {
            thinkingAudio.play();
            setIsAudioEnded(!isAudioEnded);
          });
          break;
        case "a":
        case "A":
          setFlag(false);
          setIsAudioEnded(true);
          answerVoice.src = data.answerVoice;
          seikaiwa.play();
          seikaiwa.addEventListener("ended", () => {
            answerVoice.play();
          });
          break;
        case "z":
        case "Z":
          success.play();
          break;
        case "s":
        case "S":
          setIsAudioEnded(!isAudioEnded);
          break;
        case "x":
        case "X":
          miss.play();
          break;
        case "Escape":
          sounds.map((sound) => sound.pause());
          sounds.map((sound) => (sound.currentTime = 0));
          break;
        case "j":
        case "J":
        case "k":
        case "K":
        case "l":
        case "L":
          sounds.map((sound) => sound.pause());
          break;
        case "b":
        case "B":
          if (questionVoice.src) {
            sounds.map((sound) => (sound.currentTime = 0));
            questionVoice.play();
          }
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [data]);

  return (
    <>
      <Box h={"100dvh"} bgColor={"orange.50"}>
        <Flex direction={"column"} align={"center"} maxWidth={"80%"} margin={"auto"}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error.message}</Text>
          ) : (
            <>
              <FastestPush isFocused={isFocused} />
              <Box
                h={"18dvh"}
                fontSize={"7xl"}
                display={"flex"}
                alignItems={"center"}
                onClick={() => setIsAudioEnded(!isAudioEnded)}
              >
                {flag ? "問題" : "正解"}
              </Box>
              {isAudioEnded ? <Box fontSize={"8xl"}>{flag ? data.questionText : data.answer}</Box> : ""}
            </>
          )}
        </Flex>
      </Box>
    </>
  );
}
