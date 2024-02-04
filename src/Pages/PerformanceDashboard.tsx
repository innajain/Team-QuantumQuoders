import Background from "../Background";
import mascotImage from "../assets/Group 6.png";
import booksImage from "../assets/image 13.png";
import smileysImage from "../assets/image 14.png";
import "../index.css";
import { useContext } from "react";
import { QuizContext } from "../utils/QuizContext";

function PerformanceDashboard() {
  const { name, classValue, questions, setQuizState } = useContext(QuizContext)!;

  let totalPercentage=0
  let totalQuestions=0
  let mcqPercentage=0
  let mcqQuestions=0
  let matchingPercentage=0
  let matchingQuestions=0
  let fillInTheBlanksPercentage=0
  let fillInTheBlanksQuestions=0

  questions.forEach((q) => {
    if (q.type === "mcq") {
      mcqQuestions+=1
      totalQuestions+=1
      if (q.selectedOptionIndex==q.correctOptionIndex) {
        mcqPercentage += 1;
        totalPercentage += 1;
      }
    } else if (q.type === "matching") {

      q.subQuestions.forEach((subQ) => {
        matchingQuestions+=1
        totalQuestions+=1

        if (subQ.selectedAnswerIndex==subQ.correctOptionIndex) {
          matchingPercentage += 1;
          totalPercentage += 1;
        }
      });
    } else if (q.type === "fill") {
      q.subQuestions.forEach((subQ) => {
        fillInTheBlanksQuestions+=1
        totalQuestions+=1
        if (subQ.correctAnswer==subQ.enteredAnswer) {
          fillInTheBlanksPercentage += 1;
          totalPercentage += 1;
        }
      })
    }
  });

  mcqPercentage = mcqQuestions==0?0:mcqPercentage/mcqQuestions*100
  matchingPercentage = matchingPercentage==0?0:matchingPercentage/matchingQuestions*100
  fillInTheBlanksPercentage = fillInTheBlanksPercentage==0?0:fillInTheBlanksPercentage/fillInTheBlanksQuestions*100
  totalPercentage = totalPercentage/totalQuestions*100

  if (totalPercentage % 1 != 0)
    totalPercentage = parseFloat(totalPercentage.toFixed(2));
  if (mcqPercentage % 1 != 0)
    mcqPercentage = parseFloat(mcqPercentage.toFixed(2));
  if (matchingPercentage % 1 != 0)
    matchingPercentage = parseFloat(matchingPercentage.toFixed(2));
  if (fillInTheBlanksPercentage % 1 != 0)
    fillInTheBlanksPercentage = parseFloat(fillInTheBlanksPercentage.toFixed(2));
  const performance =
    totalPercentage >= 80
      ? 4
      : totalPercentage >= 60
      ? 3
      : totalPercentage >= 40
      ? 2
      : totalPercentage >= 20
      ? 1
      : 0;

  return (
    <Background>
      <div className="flex justify-around h-full w-full sm:p-7 sm:px-10 p-5 gap-8 flex-col sm:flex-row">
        <LeftSide name={name} classValue={classValue} />
        <RightSide
          fillInTheBlanksPercentage={fillInTheBlanksPercentage}
          matchingPercentage={matchingPercentage}
          mcqPercentage={mcqPercentage}
          totalPercentage={totalPercentage}
          performance={performance}
          getToReview={() => {
            setQuizState("review");
          }}
        />
      </div>
    </Background>
  );
}

function LeftSide({ name, classValue }: { name: string; classValue: string }) {
  return (
    <div
      className="rounded-box1 bg-[#205D76] rounded-[40px] flex sm:flex-col items-center sm:w-[35%] w-full h-1/4 sm:h-full
        font-[poppins] justify-evenly"
    >
      <img
        src={mascotImage}
        className="bear_image sm:w-[50%] h-2/3 sm:h-max aspect-square justify-between "
      />
      <br />
      <section className="text-white font-bold md:text-3xl ">
        <p className="student-info mb-5 text-center">STUDENT INFO</p>
        <p className="info">Name: {name}</p>
        <p>Class: {classValue}</p>
      </section>
      {window.innerWidth > 640 ? (
        <img src={booksImage} className="books-image" />
      ) : (
        <></>
      )}
    </div>
  );
}

function RightSide({
  performance,
  totalPercentage,
  mcqPercentage,
  fillInTheBlanksPercentage,
  matchingPercentage,
  getToReview,
}: {
  performance?: number;
  totalPercentage: number;
  mcqPercentage: number;
  fillInTheBlanksPercentage: number;
  matchingPercentage: number;
  getToReview: () => void;
}) {
  return (
    <div className="flex flex-col h-full justify-around-[2.5] gap-8 sm:w-[65%] ">
      <YourPerformance
        performance={performance}
        totalPercentage={totalPercentage}
        getToReview={getToReview}
      />
      <SectionWiseScore
        mcqPercentage={mcqPercentage}
        fillInTheBlanksPercentage={fillInTheBlanksPercentage}
        matchingPercentage={matchingPercentage}
      />
    </div>
  );
}

function YourPerformance({
  performance = 0 | 1 | 2 | 3 | 4,
  totalPercentage,
  getToReview,
}: {
  performance?: number;
  totalPercentage: number;
  getToReview: () => void;
}) {
  return (
    <div className="bg-[#C8C6AE] rounded-[40px] h-[60%] flex flex-col justify-between items-center sm:p-5 relative">
      <div className="flex flex-col justify-center items-center">
        <button
          className="bg-blue-800 hover:bg-blue-900 active:bg-blue-950 rounded-xl text-white font-bold
        sm:absolute top-2 right-5 sm:p-3 p-1 px-2"
          onClick={getToReview}
        >
          Review
        </button>
        <div className="your_performance text-[#205D76] font-bold sm:text-3xl text-2xl text-center">
          YOUR PERFORMANCE
        </div>
      </div>
      <p className="sm:text-5xl text-3xl font-extrabold text-[#541039]">
        {totalPercentage}%
      </p>
      <div className="relative sm:w-full w-[120%]">
        <img src={smileysImage} className="w-full" />
        <div
          className="bg-gray-600 bg-opacity-40 h-full w-[17%] absolute top-0 rounded-xl"
          style={{ left: 8.5 + performance * 16.5 + "%" }}
        ></div>
      </div>
    </div>
  );
}

function SectionWiseScore({
  mcqPercentage,
  fillInTheBlanksPercentage,
  matchingPercentage,
}: {
  mcqPercentage: number;
  fillInTheBlanksPercentage: number;
  matchingPercentage: number;
}) {
  const percentages = [
    {
      name: "MCQ",
      percentage: mcqPercentage,
    },
    {
      name: "Fill in the blanks",
      percentage: fillInTheBlanksPercentage,
    },
    {
      name: "Matching",
      percentage: matchingPercentage,
    },
  ];

  return (
    <div className="rounded-box2 bg-[#205D76] rounded-[40px] h-[40%] flex flex-col items-center justify-evenly px-2 relative">
      <p className="text-[#62D4D4] text-xl font-bold">SECTION-WISE SCORE</p>
      <div className="flex gap-10 w-full justify-evenly h-[70%]">
        {percentages.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-[20%] justify-between aspect-square"
          >
            <p className="text-[#62D4D4] py-1" style={{ textWrap: "nowrap" }}>
              {item.name}
            </p>
            <div
              className="my-pie rounded-full aspect-square border-[10px] border-[#FFF360] h-full 
              flex justify-center items-center"
              style={{
                background:
                  "conic-gradient(" +
                  `#FFF360 0% ${item.percentage}%, ` +
                  `transparent ${item.percentage}% 100%, ` +
                  "transparent 100% 100%" +
                  ")",
              }}
            >
              <p className="text-slate-400 font-[poppins] font-bold mt-1">
                {item.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceDashboard;
