import React, { useState, useEffect } from "react";
import { Box, Grid, GridItem, Center, Text, AspectRatio, Flex, Stack } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

export default function QuizBoard() {
  const [color, setColor] = useState("red.300");
  const [grid, setGrid] = useState(
    Array(5)
      .fill()
      .map(() => Array(5).fill(""))
  );

  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case "1":
          setColor("red.300");
          break;
        case "2":
          setColor("green.300");
          break;
        case "3":
          setColor("blue.300");
          break;
        case "4":
          setColor("");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleClick = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = color;
    setGrid(newGrid);
  };

  const boxWidth = useBreakpointValue({ base: "100%", lg: "1240px" });

  return (
    <>
      <Flex alignItems={"flex-end"}>
        <Box p={5} w={boxWidth}>
          <Grid templateColumns={["repeat(5, 1fr)"]} gap={1}>
            {grid.map((row, i) =>
              row.map((cellColor, j) => (
                <GridItem key={`${i}-${j}`}>
                  <AspectRatio ratio={4 / 3} w="100%">
                    <Box
                      bg={cellColor}
                      borderWidth="2px"
                      borderColor="gray"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => handleClick(i, j)}
                    >
                      <Center height="100%">
                        <Text fontSize={"6xl"}>{i * 5 + j + 1}</Text>
                      </Center>
                    </Box>
                  </AspectRatio>
                </GridItem>
              ))
            )}
          </Grid>
        </Box>
        <Stack>
          <Center height={40}>
            {/* <Box> */}
            <img src="vite.svg" alt="" />
            {/* </Box> */}
          </Center>
          <Box maxWidth={300}>
            <img src="zunda01.png" alt="" />
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
