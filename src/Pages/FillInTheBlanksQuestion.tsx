import { useContext } from "react";
import Background from "../Background";
import { TopBar } from "./MatchingQuestions components/TopBar";
import { NavigationButtons } from "./MatchingQuestions components/NavigationButtons";
import { QuizContext } from "../utils/QuizContext";
import { FillInTheBlanksQuestionType } from "../utils/quiz";

function FillInTheBlanksQuestion() {
  const { currentQuestionIndex, questions, setQuestions } =
    useContext(QuizContext)!;
  const totalQuestions = questions.length;
  const question = questions[
    currentQuestionIndex
  ] as FillInTheBlanksQuestionType;
  return (
    <Background>
      <div
        className="flex flex-col justify-center items-center font-[Poppins] h-full 
        relative rounded-[40px] overflow-hidden"
      >
        <TopBar />
        <NavigationButtons />
        <div className="flex flex-col justify-center items-center relative w-full">
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
            Enter the correct answer.
          </h1>
          <section className="flex justify-between sm:w-[550px] w-[90%] text-white h-72">
            <ul className="flex flex-col h-full justify-between w-[40%]">
              {question.subQuestions.map((q, index) => (
                <li
                key={index}
                  className={`relative py-2 px-5 sm:min-w-52 min-w-24 shadow-lg bg-red-600 rounded-full text-center
                    font-bold sm:text-lg`}
                    style={{
                      textWrap: "nowrap",
                    }}
                >
                  {q.question}
                </li>
              ))}
            </ul>

            <ul className="flex flex-col h-full justify-between w-[50%]">
              {question.subQuestions.map((q, index) => (
                <input
                key={index}
                  className={`relative py-2 px-5 sm:min-w-72 shadow-lg bg-yellow-400
                    text-black font-bold rounded-full text-lg w-full`}
                  style={{ letterSpacing: 1 }}
                  onChange={(e) => {
                    setQuestions((prev) => {
                      const newQuestions = [...prev];
                      question.subQuestions[index].enteredAnswer = e.target.value;
                      return newQuestions;
                    });
                  }}
                  value={q.enteredAnswer}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Background>
  );
}

export default FillInTheBlanksQuestion;
