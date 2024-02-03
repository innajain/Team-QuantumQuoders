import { useContext } from "react";
import { MatchingQuestionType } from "../../utils/quiz";
import { QuizContext } from "../../utils/QuizContext";

export function QuestionsSection({
  setCurrSelQues,
  currSelAns,
  setCurrSelAns,
  currSelQues,
}: {
  setCurrSelQues: React.Dispatch<React.SetStateAction<number | undefined>>;
  currSelAns: number | undefined;
  setCurrSelAns: React.Dispatch<React.SetStateAction<number | undefined>>;
  currSelQues: number | undefined;
}) {
  const { currentQuestionIndex, questions, matchOption } =
    useContext(QuizContext)!;
  const question = questions[currentQuestionIndex] as MatchingQuestionType;
  const colors = ["FF598F", "E9ED0B", "00BFAF", "E74B4E"];

  return (
    <section className="flex flex-col items-center gap-5">
      <h3
        className="text-[#761850] font-extrabold text-xl"
        style={{ textShadow: "1px 0 #761850", letterSpacing: 1 }}
      >
        Questions
      </h3>
      <ul className="flex flex-col h-full justify-between">
        {question.subQuestions.map((q, index) => {
          return (
            <button
              key={index}
              className={`relative py-2 px-5 sm:min-w-40 max-w-[121.36px] shadow-lg font-bold`}
              style={{ textWrap: "nowrap", backgroundColor: "#"+colors[index] }}
              onClick={() => {
                if (currSelAns != undefined) {
                  matchOption({
                    answerIndex: currSelAns,
                    questionIndex: index,
                  });
                  setCurrSelAns(undefined);
                  setCurrSelQues(undefined);
                  return;
                }
                setCurrSelQues(index);
              }}
            >
              {q.question}
              {currSelQues == index && (
                <div
                  className="absolute w-[120%] h-[150%] bg-gray-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                bg-opacity-50 rounded-xl"
                ></div>
              )}
            </button>
          );
        })}
      </ul>
    </section>
  );
}
