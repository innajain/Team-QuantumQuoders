import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../Background";

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
    <Background>
      <div className="flex flex-col justify-center items-center font-[Poppins] h-full">
        <div className="flex flex-col justify-center items-center">
          <button
            className="absolute top-10 right-[10%] w-[20%] bg-[#5682DB] text-center text-white 
        font-extrabold md:text-2xl p-1 shadow-xl hover:bg-[#123C91] active:bg-[#2952A6] "
          >
            Next
          </button>
          <button
            className="absolute top-10 left-[10%] w-[25%] bg-[#5682DB] text-center text-white 
        font-extrabold md:text-2xl p-1 shadow-xl hover:bg-[#123C91] active:bg-[#2952A6]"
          >
            Previous
          </button>

          <span
            className="text-[#E74B4E] font-[1000] text-xl sm:text-3xl"
            style={{ textShadow: "1px 0 #E74B4E" }}
          >
            Question (1/3)
          </span>
          <h1
            className="font-[1000] sm:text-4xl text-2xl text-[#1E1E1E] my-10 text-center"
            style={{ textShadow: "1px 0 #1E1E1E" }}
          >
            {question.question}
          </h1>
          <ul className="flex flex-col gap-4 text-white">
            {question.options.map((option, index) => (
              <li key={index}>
                <button
                  className={`sm:min-w-64 min-w-44 flex bg-[#205D76] rounded-full font-extrabold w-full gap-3 h-full p-2 px-3 sm:p-3 shadow-xl
            ${
              selectedOption == index
                ? "bg-[#FBA43E] active:bg-[#F49E39]"
                : "hover:bg-[#082E3E] active:bg-[#0D4055]"
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
    </Background>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}

export default Quiz;
