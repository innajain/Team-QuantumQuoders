export type RetrievableStatesType = {
  states: {
    quizState: "not-started" | "started" | "performance-dashboard" | "review";
    currentQuestionIndex: number;
    level: "easy" | "medium" | "hard";
    questions: (
      | McqQuestionType
      | MatchingQuestionType
      | FillInTheBlanksQuestionType
    )[];
    selectedOptions: (number | undefined)[];
  };
  timestamp: number;
};

export type McqQuestionType = {
  type: "mcq";
  question: string;
  options: number[];
  correctOptionIndex: number;
  selectedOptionIndex?: number;
};

export type MatchingQuestionType = {
  type: "matching";
  subQuestions: {
    question: string;
    selectedAnswerIndex?: number;
    answer: number;
    correctOptionIndex: number;
  }[];
};

export type FillInTheBlanksQuestionType = {
  type: "fill";
  questions: {
    question: string;
    correctAnswer: string;
    enteredAnswer?: string;
  }[];
};

export function getNewMcqQuestion(
  level: "easy" | "medium" | "hard"
): McqQuestionType {
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

export function getNewMatchingQuestion(
  level: "easy" | "medium" | "hard"
): MatchingQuestionType {
  let questions: MatchingQuestionType["subQuestions"] = [];
  for (let i = 0; i < 4; i++) {
    const randomNum1 = Math.random();
    const randomNum2 = Math.random();
    const num1 = Math.floor(
      randomNum1 * 10 ** (level == "easy" ? 2 : level == "medium" ? 3 : 4)
    );
    const num2 = Math.floor(
      randomNum2 * 10 ** (level == "easy" ? 2 : level == "medium" ? 3 : 4)
    );

    const operation =
      level == "easy" || level == "medium"
        ? randomNum1 > 0.5
          ? "+"
          : "-"
        : randomNum1 > 0.75
        ? "*"
        : randomNum1 > 0.5
        ? "/"
        : randomNum1 > 0.25
        ? "+"
        : "-";
    let answer = eval(`${num1} ${operation} ${num2}`);
    if (answer % 1 != 0) {
      answer = parseFloat(answer.toFixed(2));
    }

    let correctOptionIndex = Math.floor(randomNum1 * 4);
    while (
      questions.some((item) => item.correctOptionIndex == correctOptionIndex)
    ) {
      correctOptionIndex = Math.floor(Math.random() * 4);
    }
    questions.push({
      question: `${num1} ${operation} ${num2} = ?`,
      correctOptionIndex,
      answer,
    });
  }
  return {
    type: "matching",
    subQuestions: questions,
  };
}

export function getSavedStatesIfValid() {
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
