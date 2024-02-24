import { useEffect, useState } from "react";
import { Text, Box, Stack, Center, Flex, AspectRatio, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import FastestPush from "../components/FastestPush";

export default function PicturesQuizTemplate({ isFocused }) {
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

  const jajan = new Audio("jajan001.mp3");
  const mondaidesu = new Audio("mondaidesu001.wav");
  const thinkingAudio = new Audio("thinking001.mp3");
  const success = new Audio("success001.mp3");
  const miss = new Audio("miss001.mp3");
  const seikaiwa = new Audio("seikaiwa000.wav");

  let questionVoice = new Audio();
  let answerVoice = new Audio();

  //soundsまとめて処理用
  const sounds = [jajan, mondaidesu, thinkingAudio, success, miss, seikaiwa, questionVoice, answerVoice];

  // JSON-Serverから当該クイズデータを取得
  useEffect(() => {
    fetchQuizData(type, id);
  }, [type, id]);

  let handleMondaidesuEnded = "";

  // イベントハンドラ
  useEffect(() => {
    if (!data) return;

    const handleJajanEnded = () => {
      mondaidesu.play();
    };
    handleMondaidesuEnded = () => {
      questionVoice.play();
    };
    const handleQuestionVoiceEnded = () => {
      setIsAudioEnded(!isAudioEnded);
      thinkingAudio.play();
    };
    const handleSeikaiwaEnded = () => {
      answerVoice.play();
    };

    jajan.addEventListener("ended", handleJajanEnded);
    mondaidesu.addEventListener("ended", handleMondaidesuEnded);
    questionVoice.addEventListener("ended", handleQuestionVoiceEnded);
    seikaiwa.addEventListener("ended", handleSeikaiwaEnded);

    return () => {
      jajan.removeEventListener("ended", handleJajanEnded);
      mondaidesu.removeEventListener("ended", handleMondaidesuEnded);
      questionVoice.removeEventListener("ended", handleQuestionVoiceEnded);
      seikaiwa.removeEventListener("ended", handleSeikaiwaEnded);
    };
  }, [data]);

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
          break;
        case "a":
        case "A":
          setFlag(false);
          setIsAudioEnded(true);
          answerVoice.src = data.answerVoice;
          seikaiwa.play();
          break;
        case "z":
        case "Z":
          success.play();
          break;
        case "x":
        case "X":
          miss.play();
          break;
        case "Escape":
        case "j":
        case "J":
        case "k":
        case "K":
        case "l":
        case "L":
          sounds.map((sound) => sound.pause());
          sounds.map((sound) => (sound.currentTime = 0));
          break;
        case "b":
        case "B":
          handleMondaidesuEnded();
          break;

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
        <Flex direction={"column"} align={"center"} maxWidth={"90%"} margin={"auto"}>
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
              {isAudioEnded ? (
                <Flex fontSize={"7xl"} onClick={() => setFlag(!flag)} align={"center"} justify={"center"} gap={16}>
                  <Box h={"50dvh"}>
                    <Image src={data.path} h={"100%"} w={"100%"} objectFit={"contain"} />
                  </Box>
                  <Box>{flag ? "" : data.answer}</Box>
                </Flex>
              ) : (
                ""
              )}
            </>
          )}
        </Flex>
      </Box>
    </>
  );
}
