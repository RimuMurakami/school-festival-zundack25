import { Box, Button, Center, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Marquee from "react-fast-marquee";

export default function SideScrollBottom({ finalFlag, onKeydownAttack }) {
  const gradationColor = "linear-gradient(to right, red, orange, yellow, orange, red)";
  return (
    <>
      <Box bg={finalFlag ? gradationColor : onKeydownAttack ? gradationColor : "orange.100"}>
        <Marquee gradient gradientWidth={100} direction="right">
          <Link to={"select-challenge-quiz"}>
            <HStack spacing={4}>
              <img src="zunda02.png" width={"85"} alt="" />
              <img src="zunda02.png" width={"85"} alt="" />
              <img src="zunda02.png" width={"85"} alt="" />
            </HStack>
          </Link>
        </Marquee>
      </Box>
    </>
  );
}
