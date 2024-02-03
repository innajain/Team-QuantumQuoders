import { createContext } from "react";
import { FillInTheBlanksQuestionType, MatchingQuestionType, McqQuestionType } from "./quiz";

export const QuizContext = createContext<{
    name: string;
    classValue: string;
    createQuestions: () => void;
    startQuiz: () => void;
    setLevel: (level: "easy" | "medium" | "hard") => void;
    level: "easy" | "medium" | "hard";
    questions: (
      | McqQuestionType
      | MatchingQuestionType
      | FillInTheBlanksQuestionType
    )[];
    currentQuestionIndex: number;
    saveMcqOption: ({
      selectedOptionIndex,
    }: {
      selectedOptionIndex: number | undefined;
    }) => void;
    goToNextQuestion: () => void;
    goToPreviousQuestion: () => void;
    quizState: "not-started" | "started" | "performance-dashboard" | "review";
    goToHomePage: () => void;
    matchOption: ({
      questionIndex,
      answerIndex,
    }: {
      questionIndex: number;
      answerIndex: number;
    }) => void;
    setQuizState: React.Dispatch<
      React.SetStateAction<
        "not-started" | "started" | "performance-dashboard" | "review"
      >
    >;
    setQuestions: React.Dispatch<
      React.SetStateAction<
        (
          | McqQuestionType
          | MatchingQuestionType
          | FillInTheBlanksQuestionType
        )[]
      >
    >;
  }>({
    name: "",
    classValue: "",
    createQuestions: () => {},
    startQuiz: () => {},
    setLevel: () => {},
    level: "easy",
    questions: [],
    currentQuestionIndex: 0,
    saveMcqOption: () => {},
    goToNextQuestion: () => {},
    goToPreviousQuestion: () => {},
    quizState: "not-started",
    goToHomePage: () => {},
    matchOption: () => {},
    setQuizState: () => {},
    setQuestions: () => {},
  });