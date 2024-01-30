import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigator = useNavigate();
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigator("/login");
        return;
      }

      setLoggedIn(true);
    });
    return unsubscribe;
  }, [loggedIn]);

  return loggedIn ? (
    <McqQuestion loggedIn={loggedIn} />
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}

function McqQuestion({ loggedIn }: { loggedIn: boolean }) {
  const [selectedOption, setSelectedOption] = useState(-1);

  const question = {
    type: "mcq",
    question: "Pick the smallest number.",
    options: ["5", "55", "25", "7"],
  };

  return loggedIn ? (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center font-[Poppins]">
      <div className="flex flex-col justify-center items-center relative">
        <button className="absolute top-[-20%] right-[-30%] w-52 bg-[#5682DB] text-center text-white 
        font-extrabold text-2xl p-1 shadow-xl hover:bg-[#123C91] active:bg-[#2952A6]">
          Next
        </button>
        <button className="absolute top-[-20%] left-[-30%] w-52 bg-[#5682DB] text-center text-white 
        font-extrabold text-2xl p-1 shadow-xl hover:bg-[#123C91] active:bg-[#2952A6]">
          Previous
        </button>

        <span
          className="text-[#E74B4E] font-[1000] text-3xl"
          style={{ textShadow: "1px 0 #E74B4E" }}
        >
          Question (1/3)
        </span>
        <h1
          className="font-[1000] text-4xl text-[#1E1E1E] my-10"
          style={{ textShadow: "1px 0 #1E1E1E" }}
        >
          {question.question}
        </h1>
        <ul className="flex flex-col gap-4 text-white">
          {question.options.map((option, index) => (
            <li key={index}>
              <button
                className={`min-w-64 flex bg-[#205D76] rounded-full font-extrabold w-full gap-3 h-full p-3 shadow-xl
            ${
              selectedOption == index
                ? "bg-[#FBA43E]"
                : "hover:bg-[#10445A] active:bg-[#D28C23]"
            }`}
                onClick={() => {
                  setSelectedOption(-1);
                  setSelectedOption(index);
                }}
              >
                <div>{`${String.fromCharCode(97 + index)})`}</div>
                <div>{option}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}

export default Quiz;
