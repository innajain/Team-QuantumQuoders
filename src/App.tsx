import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Quiz from "./Pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route
          path="/*"
          element={
            <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
              Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
