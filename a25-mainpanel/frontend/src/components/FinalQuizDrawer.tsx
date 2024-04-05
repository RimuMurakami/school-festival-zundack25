import { useDisclosure } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useEffect, useState } from "react";

type FinalQuizDrawerProps = {
  fetchQuizData: (type: string, id: string) => void;
};

export default function FinalQuizDrawer({ fetchQuizData }: FinalQuizDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState({
    anime: [],
    geography: [],
    heritage: [],
    sports: [],
  });

  const QuizButton = ({ type, id }: { type: string; id: string }) => {
    return (
      <Button
        rounded="full"
        onClick={() => {
          fetchQuizData(type, id);
        }}
      >
        {id}
      </Button>
    );
  };

  // JSON取得処理
  useEffect(() => {
    // 各リソースを非同期に取得する関数
    const fetchResource = async (resource: string) => {
      const response = await fetch(`http://localhost:4444/${resource}`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    };

    // すべてのリソースを一度に取得
    Promise.all([
      fetchResource("anime"),
      fetchResource("geography"),
      fetchResource("heritage"),
      fetchResource("sports"),
    ])
      .then(([anime, geography, heritage, sports]) => {
        setData({ anime, geography, heritage, sports });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // dataが取得された後に各カテゴリの要素数に基づいてボタンのリストを生成
  const animeButtonList = Array.from({ length: data.anime.length }, (_, i) => String(i + 1));
  const geographyButtonList = Array.from({ length: data.geography.length }, (_, i) => String(i + 1));
  const heritageButtonList = Array.from({ length: data.heritage.length }, (_, i) => String(i + 1));
  const sportsButtonList = Array.from({ length: data.sports.length }, (_, i) => String(i + 1));

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} position={"absolute"} zIndex={10} left={8} top={8} bg={"transparent"}>
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        {/* <DrawerOverlay /> */}
        <DrawerContent style={{ width: "100px" }}>
          <DrawerCloseButton />
          {/* <DrawerHeader>ずんダック２５</DrawerHeader> */}
          <DrawerBody>
            <Stack mt={10}>
              <Heading size={"md"} textAlign={"center"} bg={"red.100"} rounded={"full"}>
                ア
              </Heading>
              {animeButtonList.map((id) => (
                <QuizButton key={id} type="anime" id={id} />
              ))}
              <Heading size={"md"} textAlign={"center"} bg={"red.100"} rounded={"full"}>
                地
              </Heading>
              {geographyButtonList.map((id) => (
                <QuizButton key={id} type="geography" id={id} />
              ))}
              <Heading size={"md"} textAlign={"center"} bg={"red.100"} rounded={"full"}>
                世
              </Heading>
              {heritageButtonList.map((id) => (
                <QuizButton key={id} type="heritage" id={id} />
              ))}
              <Heading size={"md"} textAlign={"center"} bg={"red.100"} rounded={"full"}>
                ス
              </Heading>
              {sportsButtonList.map((id) => (
                <QuizButton key={id} type="sports" id={id} />
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
