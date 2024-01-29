import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
