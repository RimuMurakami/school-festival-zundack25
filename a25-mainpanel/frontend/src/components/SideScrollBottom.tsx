import { Box, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Marquee from "react-fast-marquee";

type SideScrollBottomProps = {
  finalFlag: boolean;
  onKeydownAttack: boolean;
};

export default function SideScrollBottom({ finalFlag, onKeydownAttack }: SideScrollBottomProps) {
  const gradationColor = "linear-gradient(to right, red, orange, yellow, orange, red)";
  return (
    <>
      <Box bg={finalFlag ? gradationColor : onKeydownAttack ? gradationColor : "orange.100"}>
        <Marquee gradient gradientWidth={100} direction="right">
          <Link to={"select-challenge-quiz"}>
            <HStack spacing={4}>
              <Image src="zunda02.png" h={"10%"} alt="" />
              <img src="zunda02.png" width={"70"} alt="" />
              <img src="zunda02.png" width={"70"} alt="" />
            </HStack>
          </Link>
        </Marquee>
      </Box>
    </>
  );
}
