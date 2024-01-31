import { getAuth } from "firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import McqQuestion from "./McqQuestion";
import HomePage from "./HomePage";
import PerformanceDashboard from "./PerformanceDashboard";
import Background from "../Background";

type RetrievableStatesType = {
  states: {
    quizState: "not-started" | "started" | "performance-dashboard" | "review";
    currentQuestionIndex: number;
    level: "easy" | "medium" | "hard";
    questions: React.MutableRefObject<McqQuestionType[] | undefined>;
  };
  timestamp: number;
};

export type McqQuestionType = {
  type: "mcq";
  question: string;
  options: number[];
  selectedOption?: number;
  correctOptionIndex: number;
};

export type MatchingQuestionType = {
  type: "matching";
  questions: {
    question: string;
    selectedOption?: number;
    correctOptionIndex: number;
  }[];
  options: string[];
};

export type FillInTheBlanksQuestionType = {
  type: "fill";
  questions: {
    question: string;
    correctAnswer: string;
    enteredAnswer?: string;
  }[];
};

function Quiz() {
  const retrievedStates = useRef(getSavedStatesIfValid()).current;
  const initialStates = useRef({
    quizState: retrievedStates ? retrievedStates.quizState : undefined,
    currentQuestionIndex: retrievedStates
      ? retrievedStates.currentQuestionIndex
      : undefined,
    level: retrievedStates ? retrievedStates.level : undefined,
    questions: retrievedStates ? retrievedStates.questions.current : undefined,
  }).current

  const navigator = useNavigate();
  const auth = getAuth();
  const [quizState, setQuizState] = useState<
    "not-started" | "started" | "performance-dashboard" | "review"
  >(initialStates.quizState ?? "not-started");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    initialStates.currentQuestionIndex ?? 0
  );
  const [level, setLevel] = useState<"easy" | "medium" | "hard">(
    initialStates.level ?? "easy"
  );
  const quizStructure: ("mcq" | "matching" | "fill")[] = ["mcq", "mcq", "mcq"];
  const questions = useRef<McqQuestionType[]>(initialStates.questions ?? []);

  function createQuestions() {
    questions.current = quizStructure.map((item) => {
      if (item == "mcq") {
        return getNewMcqQuestion();
      }
      // temporarily
      return getNewMcqQuestion();
    });
  }

  function getNewMcqQuestion(): McqQuestionType {
    let options: number[] = [];
    for (let i = 0; i < 4; i++) {
      let option = Math.floor(
        Math.random() * 10 ** (level == "easy" ? 2 : level == "medium" ? 3 : 4)
      );
      if (level == "hard") {
        option *= (-1) ** (Math.random() > 0.5 ? 1 : 0);
      }
      while (options.includes(option)) {
        option = Math.floor(
          Math.random() *
            10 ** (level == "easy" ? 2 : level == "medium" ? 3 : 4) *
            (-1) ** (Math.random() > 0.5 ? 1 : 0)
        );
      }
      options.push(option);
    }

    const correctAnwer = Math.min(...options);
    const correctAnswerIndex = options.indexOf(correctAnwer);
    return {
      type: "mcq",
      question: `Pick the smallest number.`,
      options: options,
      correctOptionIndex: correctAnswerIndex,
    };
  }
  function saveSelectedOption({
    selectedOptionIndex,
  }: {
    selectedOptionIndex: number;
  }) {
    questions.current![currentQuestionIndex].selectedOption =
      selectedOptionIndex;
  }

  function submitQuiz() {
    setQuizState("performance-dashboard");
  }

  function goToNextQuestion() {
    if (currentQuestionIndex == questions.current!.length - 1) {
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
    if (quizState == "review") {
      setCurrentQuestionIndex(0);
    }
  }, [quizState]);

  function getSavedStatesIfValid() {
    const retrievedStates = localStorage.getItem("retrievableStates");

    if (retrievedStates) {
      const retrievedStatesObject = JSON.parse(
        retrievedStates
      ) as RetrievableStatesType;
      if (Date.now() - retrievedStatesObject.timestamp > 5 * 60 * 1000) {
        return;
      }
      return retrievedStatesObject.states;
    }
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
  }, []);

  useEffect(() => {
    if (quizState!="not-started"){
      return
    }
    const retrievableStates = {
      states: { quizState, currentQuestionIndex, level, questions },
      timestamp: Date.now(),
    };
    localStorage.setItem(
      "retrievableStates",
      JSON.stringify(retrievableStates)
    );
  }, [quizState, currentQuestionIndex, level, questions.current]);

  if (!loggedIn)
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
        Loading...
      </div>
    );

  if (quizState == "not-started") {
    return (
      <HomePage
        createQuestions={createQuestions}
        setQuizState={setQuizState}
        setLevel={setLevel}
        level={level}
      />
    );
  }
  if (quizState == "started" || quizState == "review") {
    return questions.current![currentQuestionIndex].type == "mcq" ? (
        <McqQuestion
        question={questions.current![currentQuestionIndex]}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.current!.length}
        saveSelectedOption={saveSelectedOption}
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
        quizState={quizState}
        startNewQuiz={() => {
          setQuizState("not-started");
          setCurrentQuestionIndex(0);
        }}
        />
    ) : (
      <></>
    );
  }

  if (quizState == "performance-dashboard") {
    return (
      <PerformanceDashboard questions={questions} setQuizState={setQuizState} />
    );
  }
}

export default Quiz;
