import { createContext } from "react";
import { FillInTheBlanksQuestionType, MatchingQuestionType, McqQuestionType } from "./quiz";

export const QuizContext = createContext<{
    name: string;
    classValue: string;
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
    setQuizStructure: React.Dispatch<
      React.SetStateAction<{ mcq: number; matching: number; fill: number }>
    >;
    quizStructure: { mcq: number; matching: number; fill: number };
  }|undefined>(undefined);