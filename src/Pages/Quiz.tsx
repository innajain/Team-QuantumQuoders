import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import McqQuestion from "./McqQuestion";
import HomePage from "./HomePage";
import PerformanceDashboard from "./PerformanceDashboard";
import MatchingQuestion from "./MatchingQuestion";
import {
  FillInTheBlanksQuestionType,
  MatchingQuestionType,
  McqQuestionType,
  getNewMatchingQuestion,
  getNewMcqQuestion,
  getSavedStatesIfValid,
} from "../utils/quiz";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { QuizContext } from "../utils/QuizContext";

function Quiz() {
  const retrievedStates = getSavedStatesIfValid();
  const initialStates = {
    quizState: retrievedStates ? retrievedStates.quizState : undefined,
    currentQuestionIndex: retrievedStates
      ? retrievedStates.currentQuestionIndex
      : undefined,
    level: retrievedStates ? retrievedStates.level : undefined,
    questions: retrievedStates ? retrievedStates.questions : undefined,
    selectedOptions: retrievedStates
      ? retrievedStates.selectedOptions
      : undefined,
  };

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
  const quizStructure: ("mcq" | "matching" | "fill")[] = [
    "mcq",
    "matching",
    "mcq",
  ];
  const [questions, setQuestions] = useState<
    (McqQuestionType | MatchingQuestionType | FillInTheBlanksQuestionType)[]
  >(initialStates.questions ?? []);
  const [name, setName] = useState("");
  const [classValue, setClassValue] = useState("");

  function createQuestions() {
    setQuestions(
      quizStructure.map((item) => {
        if (item == "mcq") {
          return getNewMcqQuestion(level);
        }
        if (item == "matching") {
          return getNewMatchingQuestion(level);
        }
        // temporarily
        return getNewMcqQuestion(level);
      })
    );
  }

  function saveMcqOption({
    selectedOptionIndex,
  }: {
    selectedOptionIndex: number | undefined;
  }) {
    setQuestions((prev) => {
      (prev[currentQuestionIndex] as McqQuestionType).selectedOptionIndex =
        selectedOptionIndex;
      return [...prev];
    });
  }

  function submitQuiz() {
    setQuizState("performance-dashboard");
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

  function startQuiz() {
    createQuestions();
    setQuizState("started");
    setCurrentQuestionIndex(0);
  }

  function goToHomePage() {
    setQuizState("not-started");
    setCurrentQuestionIndex(-1);
    createQuestions();
    localStorage.removeItem("retrievableStates");
  }

  function matchOption({
    questionIndex,
    answerIndex,
  }: {
    questionIndex: number;
    answerIndex: number;
  }) {
    setQuestions((prev) => {
      (prev[currentQuestionIndex] as MatchingQuestionType).subQuestions.forEach((subQ, index) => {
        if (index == questionIndex){
          subQ.selectedAnswerIndex = answerIndex;
          return
        }
        if (subQ.selectedAnswerIndex == answerIndex) {
          subQ.selectedAnswerIndex = undefined;
          return
        }
      })
      return [...prev];
    });
  }

  useEffect(() => {
    if (quizState == "review") {
      setCurrentQuestionIndex(0);
    }
  }, [quizState]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigator("/login");
        return;
      }
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((data) => {
        setName(data.data()!.name);
        setClassValue(data.data()!.classValue);
      });

      setLoggedIn(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (quizState == "not-started") {
      return;
    }
    const retrievableStates = {
      states: { quizState, currentQuestionIndex, level, questions },
      timestamp: Date.now(),
    };
    localStorage.setItem(
      "retrievableStates",
      JSON.stringify(retrievableStates)
    );
  }, [quizState, currentQuestionIndex, level, questions]);

  if (!loggedIn)
    return (
      <div
        className="w-[100vw] h-[100vh] flex justify-center items-center 
      text-xl font-bold"
      >
        Loading...
      </div>
    );

  function getRelevantScreen() {
    if (quizState == "not-started") {
      return <HomePage />;
    }
    if (quizState == "started" || quizState == "review") {
      if (questions![currentQuestionIndex].type == "mcq") {
        return <McqQuestion />;
      }
      if (questions![currentQuestionIndex].type == "matching") {
        return <MatchingQuestion />;
      }

      return <></>;
    }
    if (quizState == "performance-dashboard") {
      return <PerformanceDashboard />;
    }

    return <></>;
  }
  return <QuizContext.Provider
    value={{
      name,
      classValue,
      createQuestions,
      startQuiz,
      setLevel,
      level,
      questions,
      currentQuestionIndex,
      saveMcqOption,
      goToNextQuestion,
      goToPreviousQuestion,
      quizState,
      goToHomePage,
      matchOption,
      setQuizState,
      setQuestions,
    }}
  >
    {getRelevantScreen()}
  </QuizContext.Provider>;
}
export default Quiz;
