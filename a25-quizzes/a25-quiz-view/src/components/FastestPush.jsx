import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

function FastestPush({ isFocused }) {
  const [message, setMessage] = useState("早押し待機中...");
  const [fastestColor, setFastestColor] = useState();
  const [winner, setWinner] = useState(null);

  const initMessage = "早押し待機中...";
  const initColor = "orange.100";
  const initWinner = null;

  const buttonSound = new Audio("button001.mp3");
  // buttonSound.volume = 0.2;

  useEffect(() => {
    isFocused ? setMessage(initMessage) : setMessage("早押し判定準備中...");
  }, [isFocused]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "r" || event.key === "R") {
        console.log("reset button!");
        setMessage(initMessage);
        setFastestColor(initColor);
        setWinner(initWinner);
      }

      if (winner) return;

      switch (event.key) {
        case "j":
        case "J":
          buttonSound.play();
          setWinner("Red Player");
          setMessage("Red Player pressed first!");
          setFastestColor("red.300");
          break;
        case "k":
        case "K":
          buttonSound.play();
          setWinner("Blue Player");
          setMessage("Blue Player pressed first!");
          setFastestColor("blue.300");
          break;
        case "l":
        case "L":
          buttonSound.play();
          setWinner("Green Player");
          setMessage("Green Player pressed first!");
          setFastestColor("green.300");
          break;
        default:
          // Do nothing for other keys
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [winner]);

  return (
    <>
      <Flex
        bg={isFocused ? "orange.100" : "purple.300"}
        w={"100dvw"}
        h={"6dvh"}
        p={4}
        bgColor={fastestColor}
        align={"center"}
        justify={"center"}
      >
        <Text fontSize="2xl">{message}</Text>
      </Flex>
      <Flex
        bg={isFocused ? "orange.100" : "purple.300"}
        w={"100dvw"}
        h={"6dvh"}
        p={4}
        bgColor={fastestColor}
        pos={"fixed"}
        bottom={"0"}
        lign={"center"}
        justify={"center"}
      >
        <Text fontSize="2xl">{message}</Text>
      </Flex>
    </>
  );
}

export default FastestPush;
