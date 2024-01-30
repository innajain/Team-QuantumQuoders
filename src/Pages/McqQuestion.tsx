import { useEffect, useState } from "react";
import { McqQuestionType } from "./Quiz";
import Background from "../Background";

function McqQuestion({
  question,
  currentQuestionIndex,
  totalQuestions,
  saveSelectedOption,
  goToNextQuestion,
  goToPreviousQuestion,
}: {
  question: McqQuestionType;
  currentQuestionIndex: number;
  totalQuestions: number;
  saveSelectedOption: ({
    selectedOptionIndex,
  }: {
    selectedOptionIndex: number;
  }) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
}) {
  const [selectedOption, setSelectedOption] = useState(-1);

  useEffect(() => {
    setSelectedOption(-1);
  }, [currentQuestionIndex]);


  return (
    <Background>
      <div className="flex flex-col justify-center items-center font-[Poppins] h-full relative rounded-[40px] overflow-hidden">
        <div className="w-[100%] h-6 bg-[#298787] absolute top-0"></div>
        <div
          className={`w-[${((1 / totalQuestions) * 100).toFixed(
            3
          )}%] h-6 bg-[#205D76] absolute top-0 left-[${(
            (currentQuestionIndex / totalQuestions) *
            100
          ).toFixed(3)}%]`}
        ></div>
        <div className="flex flex-col justify-center items-center">
          <button
            className={`absolute top-10 right-[10%] w-[20%] text-center text-white 
          font-extrabold md:text-2xl p-1 shadow-xl ${
            currentQuestionIndex != totalQuestions - 1
              ? "hover:bg-[#123C91] bg-[#5682DB] active:bg-[#2952A6] "
              : "bg-green-500 hover:bg-[#56a44d] active:bg-[#61bf74]"
          }`}
            onClick={() => {
              goToNextQuestion();
            }}
          >
            {currentQuestionIndex == totalQuestions - 1 ? "Submit" : "Next"}
          </button>
          {currentQuestionIndex != 0 ? (
            <button
              className={`absolute top-10 left-[10%] w-[25%] text-center text-white 
          font-extrabold md:text-2xl p-1 shadow-xl ${
            currentQuestionIndex != 0
              ? "hover:bg-[#123C91] bg-[#5682DB] active:bg-[#2952A6] "
              : "bg-gray-400"
          }`}
              onClick={() => {
                goToPreviousQuestion();
              }}
              disabled={currentQuestionIndex == 0}
            >
              Previous
            </button>
          ) : (
            <></>
          )}

          <span
            className="text-[#E74B4E] font-[1000] text-xl sm:text-3xl"
            style={{ textShadow: "1px 0 #E74B4E" }}
          >
            Question ({currentQuestionIndex + 1}/{totalQuestions})
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
                    setSelectedOption(index);
                    saveSelectedOption({ selectedOptionIndex: index });
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
  );
}

export default McqQuestion;
