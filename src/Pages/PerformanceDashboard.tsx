import { McqQuestionType } from "./Quiz";

function PerformanceDashboard({
  questions,
  setQuizState,
  selectedOptions
}: {
  questions: React.MutableRefObject<McqQuestionType[] | undefined>;
  setQuizState: React.Dispatch<
    React.SetStateAction<
      "not-started" | "started" | "performance-dashboard" | "review"
    >
  >;
  selectedOptions: (number | undefined)[];
}) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-4 justify-center items-center text-xl font-bold">
      Score:{" "}
      {
        questions.current!.filter(
          (q, index) => selectedOptions[index] == q.correctOptionIndex
        ).length
      }{" "}
      / {questions.current!.length}
      <button
        className="btn"
        onClick={() => {
          setQuizState("review");
        }}
      >
        Review
      </button>
    </div>
  );
}

export default PerformanceDashboard;
