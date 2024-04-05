import { Box, Text, HStack } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";

type SideScrollProps = {
  finalFlag: boolean;
  onKeydownAttack: boolean;
};

export default function SideScroll({ finalFlag, onKeydownAttack }: SideScrollProps) {
  const [votes, setVotes] = useState([0, 0, 0]);
  const [votesCondition, setVotesCondition] = useState(false);

  // 投票状況取得処理
  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await fetch("api/votes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setVotes(data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    }

    if (votesCondition) {
      fetchVotes();
      // ほぼ同期実装のポーリング処理;
      const intervalId = setInterval(fetchVotes, 3000); // 3秒ごとにデータを取得
      return () => {
        clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーをクリア
      };
    }
  }, []);

  const gradationColor = "linear-gradient(to right, red, orange, yellow, orange, red)";

  return (
    <>
      <Box bg={finalFlag ? gradationColor : onKeydownAttack ? gradationColor : "orange.100"}>
        <Marquee gradient gradientWidth={100}>
          <Box mt={2} fontSize={50}>
            <HStack spacing={10}>
              <Text onClick={() => setVotesCondition(!votesCondition)}>
                {votesCondition ? "投票状況：" : "受付終了："}
              </Text>
              <Text color="red.600" bgColor={"red.100"} rounded={"full"} px={3}>
                赤 {votes[0]}票
              </Text>
              <Text color="blue.600" bgColor={"blue.100"} rounded={"full"} px={3}>
                青 {votes[1]}票
              </Text>
              <Text color="green.600" bgColor={"green.100"} rounded={"full"} px={3}>
                緑 {votes[2]}票
              </Text>
            </HStack>
          </Box>
        </Marquee>
      </Box>
    </>
  );
}
