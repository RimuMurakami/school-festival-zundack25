import { useState, useEffect } from "react";
import { Button, Stack, Box, Text, Heading, HStack } from "@chakra-ui/react";

import FinalQuizDrawer from "./components/FinalQuizDrawer";

function App() {
  const [data, setData] = useState({
    words: [],
    pictures: [],
    videos: [],
    music: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedButtonIds, setSelectedButtonIds] = useState([]);

  let selectingQuiz = "";

  // JSON取得処理
  useEffect(() => {
    // 各リソースを非同期に取得する関数
    const fetchResource = async (resource) => {
      const response = await fetch(`http://localhost:3333/${resource}`);
      if (response.ok) {
        setIsLoading(false);
        return await response.json();
      } else {
        setError(true);
        throw new Error("Failed to fetch data");
      }
    };

    // すべてのリソースを一度に取得
    Promise.all([fetchResource("words"), fetchResource("pictures"), fetchResource("videos"), fetchResource("music")])
      .then(([words, pictures, videos, music]) => {
        setData({ words, pictures, videos, music });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ブラウザのフォーカス判断
  useEffect(() => {
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // イベントリスナをクリーンアップ
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // 問題出題画面を別画面で表示
  const openSubWindow = (type, id, answer, answerArtist, answerSong) => {
    const musicAnswerItem = `${answerArtist} - ${answerSong}`;
    // setSelectedAnswer(`${questionText} - ${answer}`);
    setSelectedAnswer(answer ?? musicAnswerItem);
    setSelectedButtonIds((prev) => [...prev, id]);

    window.open(
      `http://localhost:5555/${type}?type=${type}&id=${id}`,
      "quiz",
      `width=3000,height=3000,left=-3000,menubar=no`
    );
  };

  // wordsのデータをgenreIdに基づいてグループ化する関数
  const groupByGenreId = (words) => {
    return words.reduce((acc, word) => {
      (acc[word.genreId] = acc[word.genreId] || []).push(word);
      return acc;
    }, {});
  };

  const wordsGroupedByGenre = groupByGenreId(data.words);

  // genreIdとジャンル名のマッピング
  const genreNames = {
    1: "文学・歴史",
    2: "理科・数学",
    3: "社会・地理",
    4: "スポーツ",
    5: "サブカルチャー",
    6: "生活・雑学",
  };

  return (
    <Box h={"100dvh"}>
      <Box
        fontWeight={"bold"}
        fontSize={"3xl"}
        bg={isFocused ? "red" : "green.100"}
        color={isFocused && "white"}
        p={3}
        position={"fixed"}
        top={0}
        zIndex={100}
        left={0} // 追加
        right={0} // 追加
        marginLeft={"auto"} // 追加
        marginRight={"auto"} // 追加
      >
        <HStack textAlign={"center"}>
          <Stack flex={"1"}>
            <Text fontSize={"lg"}>現在の問題の答え:</Text>
            <Text fontSize={"2xl"} bg={"blue.200"} rounded={"full"}>
              {selectedAnswer}
            </Text>
          </Stack>
          <Text rounded={"full"} p={3} flex={"1"}>
            出題クイズ操作パネル
          </Text>
          <Text flex={"1"}>{isFocused ? "Chek focus!!!!" : "Focus OK!"}</Text>
        </HStack>
      </Box>
      <Box mt={"28"}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <>
            <Stack spacing={10}>
              {/* wordsリソースのジャンル分け表示 */}
              {Object.entries(wordsGroupedByGenre).map(([genreId, words]) => (
                <Stack key={genreId}>
                  <Heading size="lg" textAlign={"center"} m={2}>
                    <Text display={"inline"} bg={"purple.100"} p={3} py={2} rounded={"2xl"}>
                      {genreNames[genreId]}
                    </Text>
                  </Heading>
                  {words.map((word) => (
                    <Button
                      key={word.id}
                      fontSize={"xl"}
                      onClick={() => openSubWindow("words", word.id, word.answer)}
                      colorScheme={selectedButtonIds.includes(word.id) ? "teal" : null}
                    >
                      {`${word.questionText} - ${word.answer}`}
                    </Button>
                  ))}
                </Stack>
              ))}
              {/* words以外のリソースを表示 */}
              {Object.entries(data)
                .filter(([key]) => key !== "words")
                .map(([key, resource]) => (
                  <Stack key={key}>
                    <Heading size="md" textAlign={"center"} m={2}>
                      <Text display={"inline"} bg={"purple.100"} p={3} rounded={"2xl"}>
                        {key === "pictures" ? "画像" : key === "music" ? "音楽" : "動画"}
                      </Text>
                    </Heading>
                    {resource.map((item) => (
                      <Button
                        key={item.id}
                        fontSize={"xl"}
                        onClick={() => openSubWindow(key, item.id, item.answer, item.answerArtist, item.answerSong)}
                        colorScheme={selectedButtonIds.includes(item.id) ? "teal" : null}
                      >
                        {key !== "music"
                          ? `${item.questionText} - ${item.answer}`
                          : item.answerSong
                          ? `${item.answerArtist} - ${item.answerSong}`
                          : `${item.answerArtist}`}
                      </Button>
                    ))}
                  </Stack>
                ))}
            </Stack>
          </>
        )}
      </Box>
      <FinalQuizDrawer />
    </Box>
  );
}

export default App;
