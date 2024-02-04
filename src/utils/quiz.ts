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
    quisStructure: { mcq: number; matching: number; fill: number };
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
  subQuestions: {
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
      randomNum1 *
      10 ** (level == "easy" ? 1 : level == "medium" ? 2 : 3) *
      (-1) ** (level == "hard" ? (randomNum1 > 0.5 ? 1 : 0) : 0)
    );
    const num2 = Math.floor(
      randomNum2 *
      10 ** (level == "easy" ? 1 : level == "medium" ? 2 : 3) *
      (-1) ** (level == "hard" ? (randomNum2 > 0.5 ? 1 : 0) : 0)
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

    let correctOptionIndex = Math.floor(Math.random() * 4);
    while (
      questions.some((item) => item.correctOptionIndex == correctOptionIndex)
    ) {
      correctOptionIndex = Math.floor(Math.random() * 4);
    }

    let num1String = num1.toString();
    if (num1 < 0) {
      num1String = `(${num1String})`;
    }
    let num2String = num2.toString();
    if (num2 < 0) {
      num2String = `(${num2String})`;
    }
    questions.push({
      question: `${num1String} ${operation} ${num2String} = ?`,
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

export function getNewFillInTheBlanksQuestion(
  level: "easy" | "medium" | "hard"
): FillInTheBlanksQuestionType {
  let questions: FillInTheBlanksQuestionType["subQuestions"] = [];

  for (let i = 0; i < 4; i++) {
    const randomNum1 = Math.random();
    const randomNum2 = Math.random();
    const num1 = Math.floor(
      randomNum1 *
        10 ** (level == "easy" ? 1 : level == "medium" ? 2 : 3) *
        (-1) ** (level == "hard" ? (randomNum2 > 0.5 ? 1 : 0) : 0)
    );
    const num2 = Math.floor(
      randomNum2 *
      10 ** (level == "easy" ? 1 : level == "medium" ? 2 : 3) *
      (-1) ** (level == "hard" ? (randomNum2 > 0.5 ? 1 : 0) : 0)
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

    let num1String = num1.toString();
    if (num1 < 0) {
      num1String = `(${num1String})`;
    }
    let num2String = num2.toString();
    if (num2 < 0) {
      num2String = `(${num2String})`;
    }
    let answer = eval(`${num1} ${operation} ${num2}`);
    if (answer % 1 != 0) {
      answer = parseFloat(answer.toFixed(2));
    }

    questions.push({
      question: `${num1String} ${operation} ${num2String} = ?`,
      correctAnswer: answer.toString(),
    });
  }

  return {
    type: "fill",
    subQuestions: questions,
  };
}

export function createQuestions({
  setQuestions,
  quizStructure,
  level,
}: {
  setQuestions: (
    questions: (
      | McqQuestionType
      | MatchingQuestionType
      | FillInTheBlanksQuestionType
    )[]
  ) => void;
  quizStructure: { mcq: number; matching: number; fill: number };
  level: "easy" | "medium" | "hard";
}) {
  let questions = [];
  for (let index = 0; index < quizStructure.mcq; index++) {
    questions.push(getNewMcqQuestion(level));
  }
  for (let index = 0; index < quizStructure.matching; index++) {
    questions.push(getNewMatchingQuestion(level));
  }
  for (let index = 0; index < quizStructure.fill; index++) {
    questions.push(getNewFillInTheBlanksQuestion(level));
  }
  setQuestions(questions);
}
