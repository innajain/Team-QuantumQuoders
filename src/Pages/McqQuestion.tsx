import { McqQuestionType } from "../utils/quiz";
import Background from "../Background";
import { NavigationButtons } from "./MatchingQuestions components/NavigationButtons";
import { TopBar } from "./MatchingQuestions components/TopBar";
import { useContext } from "react";
import { QuizContext } from "../utils/QuizContext";
import { ClearButton } from "./MatchingQuestions components/ClearButton";

function McqQuestion() {
  const { currentQuestionIndex, questions, saveMcqOption, quizState } =
    useContext(QuizContext);

  const question = questions[currentQuestionIndex] as McqQuestionType;
  const totalQuestions = questions.length;

  return (
    <Background>
      <div
        className="flex flex-col justify-center items-center font-[Poppins] h-full 
      relative rounded-[40px] overflow-hidden"
      >
        <TopBar />
        <NavigationButtons />
        <div className="flex flex-col justify-center items-center">
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
          <section className="relative text-white">
            <ul className="flex flex-col gap-4">
              {question.options.map((option, index) => (
                <li key={index}>
                  <button
                    className={`sm:min-w-64 min-w-44 flex bg-[#205D76] 
                    rounded-full font-extrabold w-full gap-3 h-full p-2 px-3 sm:p-3 shadow-xl
              ${
                quizState == "started"
                  ? question.selectedOptionIndex == index
                    ? "bg-[#FBA43E] active:bg-[#F49E39]"
                    : "hover:bg-[#082E3E] active:bg-[#0D4055]"
                  : question.correctOptionIndex == index
                  ? "bg-green-500"
                  : question.selectedOptionIndex == index
                  ? "bg-red-500"
                  : ""
              }`}
                    onClick={() => {
                      saveMcqOption({ selectedOptionIndex: index });
                    }}
                    disabled={quizState == "review"}
                  >
                    <div>{`${String.fromCharCode(97 + index)})`}</div>
                    <div>{option}</div>
                  </button>
                </li>
              ))}
            </ul>
            <ClearButton
              handleClear={() =>
                saveMcqOption({ selectedOptionIndex: undefined })
              }
            />
          </section>

          <ReviewMessage
            quizState={quizState as "started" | "review"}
            question={question}
          />
        </div>
      </div>
    </Background>
  );
}

function ReviewMessage({
  quizState,
  question,
}: {
  quizState: "started" | "review";
  question: McqQuestionType;
}) {
  return (
    <>
      {quizState == "review" ? (
        <p
          className={`${
            question.selectedOptionIndex == undefined
              ? "text-gray-600"
              : question.selectedOptionIndex == question.correctOptionIndex
              ? "text-green-500"
              : "text-red-500"
          }
      font-bold top-10 relative sm:text-2xl text-lg`}
        >
          {question.selectedOptionIndex != undefined
            ? "Your answer was " +
              (question.correctOptionIndex == question.selectedOptionIndex
                ? "correct 🎉"
                : "incorrect 😭")
            : "You did not answer 😒"}
        </p>
      ) : (
        <></>
      )}
    </>
  );
}

export default McqQuestion;
