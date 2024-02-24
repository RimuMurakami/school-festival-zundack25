import React from "react";
import { Box, List, ListItem, Badge, Heading, Text, Button, HStack } from "@chakra-ui/react";

import data from "./finalData";

// const data = {
//   anime: [
//     {
//       id: "1",
//       basePath: "final-quiz/anime/",
//       questionText: "これらの写真から連想されるアニメのタイトルは何でしょう？",
//       questionVoice: "voice/anime-title.wav",
//       answerText: "ブラックラグーン",
//       explanation:
//         "ブラックラグーンは、タイの架空の犯罪都市ロアナプラを舞台に、運び屋と、裏社会に属する組織や人物たちが繰り広げるクライムアクション作品なのだ。",
//       answerImagePath: "src/black-answer.jpg",
//       imagePath: ["src/black1.jpg", "src/black2.jpg", "src/black3.jpg", "src/black4.jpg"],
//       music: "final-quiz/003pokemon.mp3",
//       difficulty: "S",
//     },
//     {
//       id: "2",
//       basePath: "final-quiz/anime/",
//       questionText: "これらの写真から連想されるアニメのタイトルは何でしょう？",
//       questionVoice: "voice/anime-title.wav",
//       answerText: "コードギアス",
//       explanation:
//         "コードギアスは、世界の3分の1を支配する超大国「神聖ブリタニア帝国」に対し、一人の少年が野望を抱き戦いを起こす物語なのだ。",
//       answerImagePath: "src/codgias-answer.jpg",
//       imagePath: ["src/codgias1.jpg", "src/codgias2.jpg", "src/codgias3.jpg", "src/codgias4.jpg"],
//       music: "final-quiz/003pokemon.mp3",
//       difficulty: "S",
//     },
//     {
//       id: "3",
//       basePath: "final-quiz/anime/",
//       questionText: "これらの写真から連想されるアニメのキャラクターは何でしょう？",
//       questionVoice: "voice/anime-character.wav",
//       answerText: "ゴトー（Hunter ✖️ Hunter）",
//       explanation: "ゴトーは、漫画HUNTER×HUNTERの作品のキャラで、キルアの執事なのだ。",
//       answerImagePath: "src/hunter-answer.jpg",
//       imagePath: ["src/hunter1.jpg", "src/hunter2.jpg", "src/hunter3.jpg", "src/hunter4.jpg"],
//       music: "final-quiz/003pokemon.mp3",
//       difficulty: "B",
//     },
//     {
//       id: "4",
//       basePath: "final-quiz/anime/",
//       questionText: "これらの写真から連想されるアニメのキャラクターは何でしょう？",
//       questionVoice: "voice/anime-character.wav",
//       answerText: "サヴェジ・ガーデン",
//       explanation:
//         "サヴェジ・ガーデンは、漫画『ジョジョの奇妙な冒険』第6部『ストーンオーシャン』に登場する伝書鳩なのだ。",
//       answerImagePath: "src/jojo-answer.jpg",
//       imagePath: ["src/jojo1.jpg", "src/jojo2.jpg", "src/jojo3.jpg", "src/jojo4.jpg"],
//       music: "final-quiz/003pokemon.mp3",
//       difficulty: "S",
//     },
//     {
//       id: "5",
//       basePath: "final-quiz/anime/",
//       questionText: "これらの写真から連想されるアニメのタイトルは何でしょう？",
//       questionVoice: "voice/anime-title.wav",
//       answerText: "チェンソーマン",
//       explanation:
//         "チェンソーマンは、「チェンソーの悪魔」の力を手に入れた少年・デンジの活躍を描くアクション漫画なのだ。",
//       answerImagePath: "src/tyenso-answer.jpg",
//       imagePath: ["src/tyenso1.jpg", "src/tyenso2.jpg", "src/tyenso3.jpg", "src/tyenso4.jpg"],
//       music: "final-quiz/003pokemon.mp3",
//       difficulty: "C",
//     },
//   ],
//   geography: [
//     {
//       id: "1",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される国はどこでしょう？",
//       questionVoice: "voice/kuni.wav",
//       answerText: "ベルギー",
//       explanation: "ベルギーは、ヨーロッパ有数の美食の国として有名なのだ。",
//       answerImagePath: "src/berugi1.jpg",
//       imagePath: ["src/berugi1.jpg", "src/berugi2.jpg", "src/berugi3.jpg", "src/berugi4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "A",
//     },
//     {
//       id: "2",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される国はどこでしょう？",
//       questionVoice: "voice/kuni.wav",
//       answerText: "ブラジル",
//       explanation:
//         "ブラジルは、活気あふれるコパカバーナやイパネマのビーチ、どんちゃん騒ぎの大規模なカーニバルで有名なのだ。",
//       answerImagePath: "src/BRG4.jpg",
//       imagePath: ["src/BRG1.jpg", "src/BRG3.jpg", "src/BRG4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "C",
//     },
//     {
//       id: "3",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される都道府県はどこでしょう？",
//       questionVoice: "voice/todouhuken.wav",
//       answerText: "広島県",
//       explanation: "広島は食べ物が美味しいのだ。",
//       answerImagePath: "",
//       imagePath: ["src/hirosima1.jpg", "src/hirosima2.jpg", "src/hirosima3.jpg", "src/hirosima4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "C",
//     },
//     {
//       id: "4",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される国はどこでしょう？",
//       questionVoice: "voice/kuni.wav",
//       answerText: "イタリア",
//       explanation: "イタリアは、芸術作品や古代遺跡の数々でも知られているのだ。",
//       answerImagePath: "",
//       imagePath: ["src/itaria1.jpg", "src/itaria2.jpg", "src/itaria3.jpg", "src/itaria4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "C",
//     },
//     {
//       id: "5",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される国はどこでしょう？",
//       questionVoice: "voice/kuni.wav",
//       answerText: "カナダ",
//       explanation: "カナダは、巨大な複数の滝からなるナイアガラの滝で有名なのだ。",
//       answerImagePath: "src/kanada2.jpg",
//       imagePath: ["src/kanada1.jpg", "src/kanada2.jpg", "src/kanada3.jpg", "src/kanada4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "C",
//     },
//     {
//       id: "6",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される国はどこでしょう？",
//       questionVoice: "voice/kuni.wav",
//       answerText: "ニュージーランド",
//       explanation:
//         "ニューニーランドは、ピーター・ジャクソンの映画「ロード・オブ・ザ・リング」の架空の中つ国のロケ地としても有名なのだ。",
//       answerImagePath: "",
//       imagePath: ["src/NZL1.jpg", "src/NZL2.jpg", "src/NZL3.jpg", "src/NZL4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "B",
//     },
//     {
//       id: "7",
//       basePath: "final-quiz/geography/",
//       questionText: "これらの写真から連想される都道府県はどこでしょう？",
//       questionVoice: "voice/todouhuken.wav",
//       answerText: "山口県",
//       explanation: "山口県は、当時の大名が京都を模した街づくりを行ったことから、「西の京」と呼ばれているのだ。",
//       answerImagePath: "src/yamaguti-answer.jpg",
//       imagePath: ["src/yamaguti1.jpg", "src/yamaguti2.jpg", "src/yamaguti3.jpg", "src/yamguti4.jpg"],
//       music: "final-quiz/001yoasobi.mp3",
//       difficulty: "A",
//     },
//   ],
//   heritage: [
//     {
//       id: "1",
//       basePath: "final-quiz/heritage/",
//       questionText: "これらの写真から連想される世界遺産は何でしょう？",
//       questionVoice: "voice/sekaiisan.wav",
//       answerText: "マチュピチュ",
//       explanation: "マチュピチュは南米ペルーのアンデス山脈、標高約2450mの尾根に位置する古代インカ帝国の遺跡なのだ。",
//       answerImagePath: "src/matyu4.png",
//       imagePath: ["src/matyu1.png", "src/matyu2.png", "src/matyu3.png", "src/matyu4.png"],
//       music: "final-quiz/006eva.mp3",
//       difficulty: "C",
//     },
//     {
//       id: "2",
//       basePath: "final-quiz/heritage/",
//       questionText: "これらの写真から連想される世界遺産は何でしょう？",
//       questionVoice: "voice/sekaiisan.wav",
//       answerText: "シドニー・オペラハウス",
//       explanation:
//         "オーストラリア南東部の世界都市・シドニーに位置する、シドニー・オペラハウスは2007年に世界文化遺産に登録されました。そして、世界遺産に登録された中で、最も建造年の新しい建造物として知られているのだ。",
//       answerImagePath: "src/opera4.jpg",
//       imagePath: ["src/opera1.jpg", "src/opera2.jpg", "src/opera3.jpg", "src/opera4.jpg"],
//       music: "final-quiz/006eva.mp3",
//       difficulty: "A",
//     },
//     {
//       id: "3",
//       basePath: "final-quiz/heritage/",
//       questionText: "これらの写真から連想される世界遺産は何でしょう？",
//       questionVoice: "voice/sekaiisan.wav",
//       answerText: "タージ・マハル",
//       explanation: "タージマハルは1983年に「人類の創造的才能を表現する傑作」という理由で世界遺産に登録されました。",
//       answerImagePath: "src/tazi4.jpg",
//       imagePath: ["src/tazi1.jpg", "src/tazi2.jpg", "src/tazi3.jpg", "src/tazi4.jpg"],
//       music: "final-quiz/006eva.mp3",
//       difficulty: "B",
//     },
//     {
//       id: "4",
//       basePath: "final-quiz/heritage/",
//       questionText: "これらの写真から連想される世界遺産は何でしょう？",
//       questionVoice: "voice/sekaiisan.wav",
//       answerText: "富岡製糸場",
//       explanation:
//         "富岡製糸場は、技術革新、と「技術交流」を主題とした近代の絹産業に関する遺産として世界遺産に登録されました。",
//       answerImagePath: "src/tomioka-answer.jpg",
//       imagePath: ["src/tomioka1.jpg", "src/tomioka2.jpg", "src/tomioka3.jpg", "src/tomioka4.jpg"],
//       music: "final-quiz/006eva.mp3",
//       difficulty: "B",
//     },
//   ],
//   sports: [
//     {
//       id: "1",
//       basePath: "final-quiz/sports/",
//       questionText: "これらの写真から連想されるスポーツは何でしょう？",
//       questionVoice: "voice/sports.wav",
//       answerText: "野球",
//       explanation: "WBCでの盛り上がりが記憶に新しい、人気のスポーツなのだ！",
//       answerImagePath: "src/baseball4.jpg",
//       imagePath: ["src/baseball1.jpg", "src/baseball2.jpg", "src/baseball3.jpg", "src/baseball4.jpg"],
//       music: "final-quiz/005jojo.mp3",
//       difficulty: "C",
//     },
//     {
//       id: "2",
//       basePath: "final-quiz/sports/",
//       questionText: "これらの写真から連想されるスポーツは何でしょう？",
//       questionVoice: "voice/sports.wav",
//       answerText: "クリケット",
//       explanation:
//         "クリケットは何よりもフェアプレーと社交を重んじ、純白のユニフォーム、芝生のグラウンド、試合中のティータイムなど優雅な雰囲気をもつのが大きな特徴のスポーツなのだ！",
//       answerImagePath: "src/criket3.jpg",
//       imagePath: ["src/criket1.jpg", "src/criket2.jpg", "src/criket3.jpg"],
//       music: "final-quiz/005jojo.mp3",
//       difficulty: "B",
//     },
//     {
//       id: "3",
//       basePath: "final-quiz/sports/",
//       questionText: "これらの写真から連想されるスポーツは何でしょう？",
//       questionVoice: "voice/sports.wav",
//       answerText: "サッカー",
//       explanation: "サッカーは4年に一度のW杯の時には、日本中が盛り上がる人気のスポーツなのだ！",
//       answerImagePath: "src/soccer-answer.jpg",
//       imagePath: ["src/soccer1.jpg", "src/soccer2.jpg", "src/soccer3.jpg", "src/soccer4.jpg"],
//       music: "final-quiz/005jojo.mp3",
//       difficulty: "C",
//     },
//   ],
// };

const genres = ["アニメ", "地理", "世界遺産", "スポーツ"];

const FinalListsGenre = genres.map((genre) => (
  <Heading size="lg" textAlign={"center"} m={4}>
    <Text display={"inline"} bg={"purple.100"} p={3} py={2} rounded={"2xl"}>
      {genre}
    </Text>
  </Heading>
));

const finalQuizzes = (item) => {
  return (
    <ListItem key={item.id} p="4" borderWidth="1px" borderRadius="lg">
      <Box>
        {/* <Badge colorScheme="blue" mr="2">{`ID: ${item.id}`}</Badge> */}
        <Button fontSize={"4xl"}>{item.id}</Button>
        <Button
          fontSize={"2xl"}
          colorScheme={
            item.difficulty === "S"
              ? "red"
              : item.difficulty === "A"
              ? "orange"
              : item.difficulty === "B"
              ? "yellow"
              : "green"
          }
        >
          {`難易度: ${item.difficulty}`}
        </Button>
      </Box>
      <Box mt="2" fontSize={"md"}>
        {item.questionText}
      </Box>
      <HStack spacing={4}>
        <Box mt="2" fontSize={"md"} fontWeight={"bold"}>
          答え:　
        </Box>
        <Box mt="2" fontSize={"3xl"} fontWeight={"bold"}>
          {item.answerText}
        </Box>
      </HStack>
    </ListItem>
  );
};

const FinalQuizLists = () => {
  return (
    <>
      <Heading size="lg" textAlign={"center"} mb={2}>
        {/* <Text display={"inline"} bg={"purple.100"} p={3} py={2} rounded={"2xl"}> */}
        FInal Quizzes
        {/* </Text> */}
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {FinalListsGenre[0]}
        <List spacing={3}>{data.anime.map((item) => finalQuizzes(item))}</List>
        {FinalListsGenre[1]}
        <List spacing={3}>{data.geography.map((item) => finalQuizzes(item))}</List>
        {FinalListsGenre[2]}
        <List spacing={3}>{data.heritage.map((item) => finalQuizzes(item))}</List>
        {FinalListsGenre[3]}
        <List spacing={3}>{data.sports.map((item) => finalQuizzes(item))}</List>
      </Box>
    </>
  );
};

export default FinalQuizLists;
