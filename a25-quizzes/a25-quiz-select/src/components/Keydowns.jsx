import React, { useEffect } from "react";
import { Button, HStack } from "@chakra-ui/react";

const Keydowns = () => {
  const finalQuizSuccessSound = new Audio("fanfare.mp3");
  const finalQuizMissSound = new Audio("miss.mp3");

  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key;
      key === "z" ? finalQuizSuccessSound.play() : "";
      key === "x" ? finalQuizMissSound.play() : "";
    };

    window.addEventListener("keydown", handleKeydown);

    // コンポーネントのクリーンアップ時にイベントリスナーを削除
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []); // このEffectはコンポーネントがマウントされたときにのみ実行されるようにしたいので、依存配列は空にしています。

  return (
    <>
      <HStack spacing={10}>
        <Button onClick={() => finalQuizSuccessSound.play()} colorScheme="blue">
          正解（ファンファーレ）
        </Button>
        <Button onClick={() => finalQuizMissSound.play()} colorScheme="red">
          不正解
        </Button>
      </HStack>
    </>
  );
};

export default Keydowns;
