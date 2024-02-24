import { useEffect, useState, useRef } from "react";
import { Text, Box, Stack, Flex, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import FastestPush from "../components/FastestPush";

export default function VideosQuizTemplate({ isFocused }) {
  const [flag, setFlag] = useState(true);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // for videoTemplate
  const videoElementRef = useRef(null);
  const [isVideoFinished, setIsVideoFinished] = useState(false);

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

  //video専用
  const introMessage = new Audio("videos/intro-message.wav");
  let isPushedButton = false;

  //soundsまとめて処理用
  const sounds = [jajan, mondaidesu, thinkingAudio, success, miss, seikaiwa, questionVoice, answerVoice, introMessage];

  let videoLoadedCount = 0;

  // JSON-Serverから当該クイズデータを取得
  useEffect(() => {
    fetchQuizData(type, id);
  }, [type, id]);

  // イベントハンドラ各種処理
  useEffect(() => {
    if (!data) return;

    const handleJajanEnded = () => {
      introMessage.play();
    };
    const handleIntroMessageEnded = () => {
      setIsAudioEnded(!isAudioEnded);
      setTimeout(() => {
        videoElementRef.current && videoElementRef.current.play();
      }, 1000);
    };
    const handleVideoEnded = () => {
      setTimeout(() => {
        if (videoLoadedCount === 0) {
          mondaidesu.play();
          videoLoadedCount += 1;
        }
      }, 800);
    };
    const handleMondaidesuEnded = () => {
      setTimeout(() => {
        questionVoice.play();
      }, 500);
    };
    const handleQuestionVoiceEnded = () => {
      thinkingAudio.play();
      setTimeout(() => {
        setIsVideoFinished(true);
        setTimeout(() => {
          isPushedButton ? "" : videoElementRef.current && videoElementRef.current.play();
        }, 1000);
      }, 1000);
    };

    const handleSeikaiwaEnded = () => {
      answerVoice.play();
    };

    jajan.addEventListener("ended", handleJajanEnded);
    introMessage.addEventListener("ended", handleIntroMessageEnded);
    videoElementRef.current.addEventListener("ended", handleVideoEnded);
    mondaidesu.addEventListener("ended", handleMondaidesuEnded);
    questionVoice.addEventListener("ended", handleQuestionVoiceEnded);
    seikaiwa.addEventListener("ended", handleSeikaiwaEnded);

    return () => {
      jajan.removeEventListener("ended", handleJajanEnded);
      introMessage.removeEventListener("ended", handleIntroMessageEnded);
      videoElementRef.current && videoElementRef.current.removeEventListener("ended", handleVideoEnded);
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
          console.log("pushed button");
          isPushedButton = true;
          sounds.map((sound) => sound.pause());
          sounds.map((sound) => (sound.currentTime = 0));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [data, isPushedButton]);

  return (
    <>
      <Box h={"100dvh"} bgColor={"orange.50"} position={"relative"}>
        <Flex direction={"column"} align={"center"} maxWidth={"80%"} margin={"auto"}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error.message}</Text>
          ) : (
            <>
              <FastestPush isFocused={isFocused} />
              <Box
                h={"12dvh"}
                fontSize={"7xl"}
                display={"flex"}
                alignItems={"center"}
                onClick={() => setIsAudioEnded(!isAudioEnded)}
              >
                {flag ? "問題" : "正解"}
              </Box>
              {isAudioEnded ? "" : <Box h={"100dvh"} bg={"orange.50"}></Box>}
              <Box fontSize={"8xl"} onClick={() => setFlag(!flag)}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  {flag ? (
                    <Stack align={"center"} spacing={8}>
                      <Box>
                        <video ref={videoElementRef}>
                          <source src={data.path} type="video/mp4" />
                        </video>
                      </Box>
                      <Box fontSize={"7xl"}>{isVideoFinished ? <Text>{data.questionText}</Text> : ""}</Box>
                    </Stack>
                  ) : (
                    <Stack mt={5} spacing={5} alignItems={"center"}>
                      <Box>{data.answer}</Box>
                      <Image src={data.answerPicture} w={"50%"} />
                    </Stack>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
}
