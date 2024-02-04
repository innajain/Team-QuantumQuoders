import Background from "../Background";
import { useContext, useRef, useState } from "react";
import { TopBar } from "./MatchingQuestions components/TopBar";
import { NavigationButtons } from "./MatchingQuestions components/NavigationButtons";
import { AnswersSection } from "./MatchingQuestions components/AnswersSection";
import { QuestionsSection } from "./MatchingQuestions components/QuestionsSection";
import { ClearButton } from "./MatchingQuestions components/ClearButton";
import { QuizContext } from "../utils/QuizContext";
import { MatchingQuestionType } from "../utils/quiz";

function MatchingQuestion() {
  const { currentQuestionIndex, questions, setQuestions, quizState } =
    useContext(QuizContext)!;
  const totalQuestions = questions.length;
  const question = questions[currentQuestionIndex] as MatchingQuestionType;
  const [currSelQues, setCurrSelQues] = useState<number | undefined>(undefined);
  const [currSelAns, setCurrSelAns] = useState<number | undefined>(undefined);
  const drawingAreaRef = useRef<HTMLDivElement>(null);
  const topDistance = 60;
  const intervalDistance = 68;
  const colors = ["FF598F", "E9ED0B", "00BFAF", "E74B4E"];
  const angles = window.innerWidth>460?[0, 31, 50, 60.5]:[0, 49, 67, 74.5];
  const lengths = window.innerWidth>460?[120, 140, 177, 233]:[55, 93, 145, 210];
  const topDistances = [63, 132, 200, 268];
  const leftDistances = [13, 13, 13, 14];
  const lines = (
    questions[currentQuestionIndex] as MatchingQuestionType
  ).subQuestions
    .map((q, index) => {
      if (q.selectedAnswerIndex == undefined) {
        return undefined;
      }
      return {
        top: topDistances[index],
        left: leftDistances[Math.abs(q.selectedAnswerIndex - index)],
        length: lengths[Math.abs(q.selectedAnswerIndex - index)],
        angle:
          angles[Math.abs(q.selectedAnswerIndex - index)] *
          (-1) ** (q.selectedAnswerIndex <= index ? 1 : 0),
        color: colors[index],
      };
    })
    .filter((line) => line != undefined) as {
    top: number;
    left: number;
    length: number;
    angle: number;
    color: string;
  }[];

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
            className="font-[1000] sm:text-4xl text-2xl text-[#1E1E1E] my-5 text-center"
            style={{ textShadow: "1px 0 #1E1E1E" }}
          >
            Match the correct options
          </h1>
          <section className="flex justify-between w-[320px] sm:w-[465px] text-white h-72">
            <QuestionsSection
              currSelAns={currSelAns}
              setCurrSelAns={setCurrSelAns}
              setCurrSelQues={setCurrSelQues}
              currSelQues={currSelQues}
            />
            <div className="w-full relative" ref={drawingAreaRef}>
              {lines.map((line) => (
                <div
                  key={line.color}
                  style={{
                    position: "absolute",
                    height: 4,
                    width: line.length,
                    backgroundColor: "#" + line.color,
                    transform: `rotate(${line.angle}deg)`,
                    transformOrigin: "0 0",
                    top: line.top,
                    left: line.left,
                  }}
                ></div>
              ))}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="rounded-full bg-[#E9ED0B] w-3 aspect-square absolute 
                top-[60px] left-2"
                  style={{
                    top: topDistance + index * intervalDistance,
                  }}
                ></div>
              ))}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="rounded-full bg-[#5682DB] w-3 aspect-square absolute 
                top-[60px] right-2"
                  style={{
                    top: topDistance + index * intervalDistance,
                  }}
                ></div>
              ))}
            </div>
            <AnswersSection
              currSelQues={currSelQues}
              setCurrSelAns={setCurrSelAns}
              setCurrSelQues={setCurrSelQues}
              currSelAns={currSelAns}
            />
          </section>
          <ClearButton
            handleClear={() => {
              setQuestions((prev) => {
                const newQuestions = [...prev];
                const question = newQuestions[
                  currentQuestionIndex
                ] as MatchingQuestionType;
                question.subQuestions.forEach((q) => {
                  q.selectedAnswerIndex = undefined;
                });
                return newQuestions;
              });
              setCurrSelAns(undefined);
              setCurrSelQues(undefined);
            }}
          />
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
  question: MatchingQuestionType;
}) {
  const answeredCorrectly = question.subQuestions.reduce((acc, curr) => {
    return curr.selectedAnswerIndex == curr.correctOptionIndex ? acc + 1 : acc;
  }, 0);
  const attempted = question.subQuestions.reduce((acc, curr) => {
    return curr.selectedAnswerIndex == undefined ? acc : acc + 1;
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

export default MatchingQuestion;
