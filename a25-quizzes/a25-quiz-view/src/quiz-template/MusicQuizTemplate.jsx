import { useEffect, useState } from "react";
import { Text, Box, Stack, Center, Flex, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import FastestPush from "../components/FastestPush";

export default function MusicQuizTemplate({ isFocused }) {
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
  const thinkingAudio = new Audio("thinking001.mp3");
  const success = new Audio("success001.mp3");
  const miss = new Audio("miss001.mp3");
  const seikaiwa = new Audio("seikaiwa000.wav");

  // music専用
  const [isJacketFlag, setIsJacketFlag] = useState(false);
  let isPushedButton = false;
  const introQuiz = new Audio("music/introquiz001.wav");
  let answerArtistVoice = new Audio();
  let answerSongVoice = new Audio();
  let quizMusic = new Audio();

  //soundsまとめて処理用
  const sounds = [
    jajan,
    thinkingAudio,
    success,
    miss,
    seikaiwa,
    answerArtistVoice,
    answerSongVoice,
    introQuiz,
    quizMusic,
  ];

  // JSON-Serverから当該クイズデータを取得
  useEffect(() => {
    fetchQuizData(type, id);
  }, [type, id]);

  let handleIntroQuizEnded = "";

  // イベントハンドラ
  useEffect(() => {
    if (!data) return;

    const handleJajanEnded = () => {
      introQuiz.play();
    };
    handleIntroQuizEnded = () => {
      console.log("clicked");
      quizMusic.src = data.path;
      setTimeout(() => {
        quizMusic.volume = 0.5;
        quizMusic.play();
      }, 1000);
      setTimeout(() => {
        setIsAudioEnded(!isAudioEnded);
      }, 5000);
      setTimeout(() => {
        isPushedButton ? "" : setIsJacketFlag(!isJacketFlag);
      }, 10000);
    };
    // const handleQuizMusicEnded = () => {
    //   setTimeout(() => {
    //     thinkingAudio.play();
    //   }, 400);
    // };
    const handleSeikaiwaEnded = () => {
      answerArtistVoice.src = data.answerArtistVoice;
      answerArtistVoice.play();
    };

    const handleAnswerArtistVoiceEnded = () => {
      answerSongVoice.src = data.answerSongVoice;
      setTimeout(() => {
        answerSongVoice.src ? answerSongVoice.play() : "";
      }, 100);
    };

    jajan.addEventListener("ended", handleJajanEnded);
    introQuiz.addEventListener("ended", handleIntroQuizEnded);
    // quizMusic.addEventListener("ended", handleQuizMusicEnded);
    seikaiwa.addEventListener("ended", handleSeikaiwaEnded);
    answerArtistVoice.addEventListener("ended", handleAnswerArtistVoiceEnded);

    return () => {
      jajan.removeEventListener("ended", handleJajanEnded);
      introQuiz.removeEventListener("ended", handleIntroQuizEnded);
      // quizMusic.removeEventListener("ended", handleQuizMusicEnded);
      seikaiwa.removeEventListener("ended", handleSeikaiwaEnded);
      answerArtistVoice.removeEventListener("ended", handleAnswerArtistVoiceEnded);
    };
  }, [data]);

  // keydown処理
  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case "q":
        case "Q":
          setTimeout(() => {
            jajan.play();
          }, 500);
          break;
        case "a":
        case "A":
          setFlag(false);
          setIsAudioEnded(true);
          setIsJacketFlag(true);
          seikaiwa.play();
          setTimeout(() => {
            quizMusic.src = data.path;
            quizMusic.volume = 0.25;
            quizMusic.play();
          }, 0);
          break;
        case "f":
        case "F":
          if (quizMusic) {
            let timerid = setInterval(() => {
              // ボリュームが0になったら終了
              if (quizMusic.volume - 0.1 <= 0) {
                quizMusic.volume = 0;
                quizMusic.pause();
                clearInterval(timerid); //タイマー解除
              }
              // 0.1ずつボリュームを減らしていく
              else {
                quizMusic.volume -= 0.01;
              }
            }, 300);
          }
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
          isPushedButton = true;
          sounds.map((sound) => sound.pause());
          sounds.map((sound) => (sound.currentTime = 0));
          break;
        case "b":
        case "B":
          // if (quizMusic.src) {
          //   quizMusic.currentTime = 0;
          //   quizMusic.play();
          // }
          isPushedButton = false;
          handleIntroQuizEnded();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [data, isPushedButton]);

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
                onClick={() => {
                  setIsAudioEnded(!isAudioEnded);
                  setIsJacketFlag(true);
                }}
              >
                {flag ? "問題" : "正解"}
              </Box>
              {isAudioEnded ? (
                <Flex
                  fontSize={"7xl"}
                  onClick={() => setFlag(!flag)}
                  align={"center"}
                  justify={"center"}
                  gap={5}
                  h={"80dvh"}
                >
                  <Box h={"100%"}>
                    <Image src={data.firstHintPicture} h={"70%"} w={"100%"} objectFit={"contain"} />
                  </Box>
                  <Box whiteSpace={"nowrap"}>
                    {flag ? (
                      ""
                    ) : (
                      <Box bg={"orange.100"} rounded={"3xl"} p={3}>
                        <Box fontSize={"7xl"} mb={8}>
                          {data.answerArtist ?? ""}
                        </Box>
                        <Box fontSize={"7xl"} textAlign={"center"}>
                          {data.answerSong ?? ""}
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {isJacketFlag ? (
                    data.secondHintPicture ? (
                      <>
                        <Box h={"100%"}>
                          <Image src={data.secondHintPicture} h={"70%"} w={"100%"} objectFit={"contain"} />
                        </Box>
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
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
