import React from 'react'

function HomePage({
    starQuiz,
    setLevel,
    level,
    }: {
    createQuestions: () => void;
    starQuiz: () => void;
    setLevel: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">>;
    level: "easy" | "medium" | "hard";
}) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-4 justify-center items-center text-xl font-bold">
      <button
        className="btn"
        onClick={starQuiz}
      >
        Start Quiz
      </button>
      <select
        name="levels"
        value={level}
        onChange={(e) => {
          setLevel(e.target.value as "easy" | "medium" | "hard");
        }}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default HomePage