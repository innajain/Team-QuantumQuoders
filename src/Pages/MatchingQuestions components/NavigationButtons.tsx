import { useContext } from "react";
import { QuizContext } from "../../utils/QuizContext";

export function NavigationButtons() {
  const {
    currentQuestionIndex,
    questions,
    goToNextQuestion,
    goToPreviousQuestion,
    quizState,
    goToHomePage,
  } = useContext(QuizContext);
const totalQuestions = questions.length;
  return (
    <>
      {quizState != "review" || currentQuestionIndex != totalQuestions - 1 ? (
        <button
          className={`absolute top-10 right-[10%] min-w-[15%] text-center text-white 
          font-extrabold md:text-2xl p-1 px-3 shadow-xl ${
            currentQuestionIndex != totalQuestions - 1
              ? "hover:bg-[#123C91] bg-[#5682DB]"
              : "bg-green-500 hover:bg-[#56a44d]"
          }`}
          onClick={() => {
            goToNextQuestion();
          }}
        >
          {currentQuestionIndex == totalQuestions - 1 ? "Submit" : "Next"}
        </button>
      ) : (
        <button
          className={`absolute top-10 right-[10%] min-w-[15%] text-center text-white 
          font-extrabold md:text-2xl p-1 px-3 shadow-xl bg-green-500 hover:bg-[#56a44d]`}
          onClick={() => {
            goToHomePage();
          }}
        >
          Go to homepage
        </button>
      )}
      {currentQuestionIndex != 0 ? (
        <button
          className={`absolute top-10 left-[10%] min-w-[15%] text-center text-white 
          font-extrabold md:text-2xl p-1 px-3 shadow-xl ${
            currentQuestionIndex != 0
              ? "hover:bg-[#123C91] bg-[#5682DB] "
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
    </>
  );
}
