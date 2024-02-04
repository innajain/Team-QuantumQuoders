import { useContext } from "react";
import Background from "../Background";
import { TopBar } from "./MatchingQuestions components/TopBar";
import { NavigationButtons } from "./MatchingQuestions components/NavigationButtons";
import { QuizContext } from "../utils/QuizContext";
import { FillInTheBlanksQuestionType } from "../utils/quiz";

function FillInTheBlanksQuestion() {
  const { currentQuestionIndex, questions, setQuestions, quizState } =
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
          <section className="flex justify-between sm:w-[600px] w-[90%] text-white h-72 gap-3">
            <ul className="flex flex-col h-full justify-between w-[50%] gap-10">
              {question.subQuestions.map((q, index) => (
                <li
                  key={index}
                  className={`relative py-2 sm:px-5 sm:min-w-52 max-w-56 shadow-lg bg-red-600 rounded-full text-center
                    font-bold sm:text-lg text-xs h-full flex flex-col items-center justify-center`}
                  style={{ textWrap: "nowrap" }}
                >
                  {q.question}
                </li>
              ))}
            </ul>

            <ul className="flex flex-col h-full justify-between w-[50%] gap-10">
              {question.subQuestions.map((q, index) => {
                if (quizState != "review") {
                  return (
                    <input
                      key={index}
                      className={`relative py-2 px-5 sm:min-w-72 shadow-lg bg-zinc-300
                        text-black font-bold rounded-full sm:text-lg text-sm w-full
                        cursor-text`}
                      style={{ letterSpacing: 1 }}
                      onChange={(e) => {
                        setQuestions((prev) => {
                          question.subQuestions[index].enteredAnswer =
                            e.target.value;
                          return [...prev];
                        });
                      }}
                      value={q.enteredAnswer}
                    />
                  );
                }
                return (
                  <div
                    key={index}
                    className={`relative py-2 px-5 sm:min-w-72 shadow-lg
                text-black font-bold rounded-full sm:text-lg text-sm w-full
                cursor-default h-full text-center flex gap-5 justify-center ${
                  q.enteredAnswer == ""
                    ? "bg-zinc-300"
                    : q.correctAnswer != q.enteredAnswer
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
                  >
                    <span className="text-green-700 flex items-center gap-2">
                      {q.correctAnswer}
                      {q.enteredAnswer != "" ? (
                        <span className="material-symbols-outlined relative ">
                          done
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                    {q.correctAnswer != q.enteredAnswer &&
                    q.enteredAnswer != "" ? (
                      <span className="text-red-700 flex items-center gap-2 ">
                        {q.enteredAnswer}
                        <span className="material-symbols-outlined">close</span>
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </ul>
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
  question: FillInTheBlanksQuestionType;
}) {
  const answeredCorrectly = question.subQuestions.reduce((acc, curr) => {
    return curr.enteredAnswer == curr.correctAnswer ? acc + 1 : acc;
  }, 0);
  const attempted = question.subQuestions.reduce((acc, curr) => {
    return curr.enteredAnswer == "" ? acc : acc + 1;
  }, 0);
  return (
    <>
      {quizState == "review" ? (
        <p
          className={`${
            attempted == 0
              ? "text-gray-600"
              : answeredCorrectly == 4
              ? "text-green-500"
              : answeredCorrectly > 0
              ? "text-orange-500"
              : "text-red-500"
          }
      font-bold top-10 relative sm:text-2xl text-lg`}
        >
          {attempted == 0
            ? "You didn't attempt any question 😒"
            : answeredCorrectly == 4
            ? "All answers were correct 🎉"
            : answeredCorrectly == 1
            ? "You answered 1 question correctly 😊"
            : answeredCorrectly > 0
            ? `You answered ${answeredCorrectly} questions correctly 😊`
            : "No answers were correct 😭"}
        </p>
      ) : (
        <></>
      )}
    </>
  );
}

export default FillInTheBlanksQuestion;
