import { useContext } from "react";
import { MatchingQuestionType } from "../../utils/quiz";
import { QuizContext } from "../../utils/QuizContext";

export function AnswersSection({
  currSelQues,
  setCurrSelAns,
  setCurrSelQues,
  currSelAns,
}: {
  currSelQues: number | undefined;
  setCurrSelAns: (index: number | undefined) => void;
  currSelAns: number | undefined;
  setCurrSelQues: (index: number | undefined) => void;
}) {
  const { currentQuestionIndex, questions, matchOption,level } =
    useContext(QuizContext)!;
  const question = questions[currentQuestionIndex] as MatchingQuestionType;
  const colors = ["FF598F", "E9ED0B", "00BFAF", "E74B4E"];


  return (
    <section className="flex flex-col items-center gap-5">
      <h3
        className="text-[#761850] font-extrabold text-xl"
        style={{ textShadow: "1px 0 #761850", letterSpacing: 1 }}
      >
        Answers
      </h3>
      <ul className="flex flex-col h-full justify-between">
        {question.subQuestions.map((_, index) => {
          const matchingQuestionIndex = question.subQuestions.findIndex((qq) => {
            return qq.selectedAnswerIndex == index;
          });
          return (
            <button
              key={index}
              className={`relative py-2 sm:min-w-40 w-[117px] shadow-lg font-bold text-xs sm:text-base ${level=="hard"?"text-[10px] sm:text-sm":""}`}
              style={{
                backgroundColor: matchingQuestionIndex == -1 ? "rgb(107 114 128)": "#"+colors[matchingQuestionIndex],
              }}
              onClick={() => {
                if (currSelQues != undefined) {
                  matchOption({
                    answerIndex: index,
                    questionIndex: currSelQues,
                  });
                  setCurrSelAns(undefined);
                  setCurrSelQues(undefined);
                  return;
                }
                setCurrSelAns(index);
              }}
            >
              {
                question.subQuestions.find((qq) => qq.correctOptionIndex == index)!
                  .answer
              }
              {currSelAns == index && (
                <div className="absolute w-[120%] h-[150%] bg-gray-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                bg-opacity-50 rounded-xl"></div>
              )}
            </button>
          );
        })}
      </ul>
    </section>
  );
}
