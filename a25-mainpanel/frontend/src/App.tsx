import { BrowserRouter } from "react-router-dom";
import QuizBoard from "./components/QuizBoard";

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
