import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import McqQuestion from "./McqQuestion";

export type McqQuestionType = {
  type: "mcq";
  question: string;
  options: number[];
  selectedOption?: number;
};

export type MatchingQuestionType = {
  type: "matching";
  question: string;
  options1: string[];
};

function Quiz() {
  const navigator = useNavigate();
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const level = "easy";
  const quizStructure = [{ type: "mcq", numberOfQuestions: 3 }];
  const questions = quizStructure
    .map((set) => {
      if (set.type == "mcq") {
        return Array.from<undefined, McqQuestionType>(
          { length: set.numberOfQuestions },
          () => getNewMcqQuestion()
        );
      }
      return [];
    })
    .reduce((acc, val) => acc.concat(val), []);

  function getNewMcqQuestion(): McqQuestionType {
    return {
      type: "mcq",
      question: `Pick the smallest number.`,
      options: Array.from({ length: 4 }, () => {
        return Math.floor(
          Math.random() *
            10 ** (level == "easy" ? 2 : level == "medium" ? 3 : 4) *
            (-1) ** (Math.random() > 0.5 ? 1 : 0)
        );
      }),
    };

  }
  function saveSelectedOption({
    selectedOptionIndex,
  }: {
    selectedOptionIndex: number;
  }) {
    questions[currentQuestionIndex].selectedOption = selectedOptionIndex;
  }

  function submitQuiz() {
    navigator("/performance");
  }

  function goToNextQuestion() {
    if (currentQuestionIndex == questions.length - 1) {
      submitQuiz();
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex == 0) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigator("/login");
        return;
      }

      setLoggedIn(true);
    });
    return unsubscribe;
  }, [loggedIn]);

  return loggedIn ? (
    questions[currentQuestionIndex].type == "mcq" ? (
      <McqQuestion
        question={questions[currentQuestionIndex]}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        saveSelectedOption={saveSelectedOption}
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
      />
    ) : (
      <></>
    )
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}



export default Quiz;
