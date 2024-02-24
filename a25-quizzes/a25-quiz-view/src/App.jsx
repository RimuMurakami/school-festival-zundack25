import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import WordsQuizTemplate from "/src/quiz-template/WordsQuizTemplate";
import PicturesQuizTemplate from "/src/quiz-template/PicturesQuizTemplate";
import VideosQuizTemplate from "/src/quiz-template/VideosQuizTemplate";
import MusicQuizTemplate from "/src/quiz-template/MusicQuizTemplate";
import FastestPush from "/src/components/FastestPush";

function App() {
  const [isFocused, setIsFocused] = useState(true); // 新しいstateの追加

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

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FastestPush />} />
          <Route path="words" element={<WordsQuizTemplate isFocused={isFocused} />} />
          <Route path="pictures" element={<PicturesQuizTemplate isFocused={isFocused} />} />
          <Route path="videos" element={<VideosQuizTemplate isFocused={isFocused} />} />
          <Route path="music" element={<MusicQuizTemplate isFocused={isFocused} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
