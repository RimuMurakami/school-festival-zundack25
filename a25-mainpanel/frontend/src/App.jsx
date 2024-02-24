import QuizBoard from "./components/QuizBoard";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <QuizBoard />
      </BrowserRouter>
    </>
  );
}

export default App;
