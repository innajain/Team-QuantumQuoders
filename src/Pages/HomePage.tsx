
import { useContext } from "react";
import Background from "../Background";
import "../styles1.css";
import easyImage from "../assets/Group 27.png";
import hardImage from "../assets/Group 26.png";
import mediumImage from "../assets/Group 28.png";
import { getAuth } from "firebase/auth";
import { QuizContext } from "../utils/QuizContext";

function HomePage() {
  const {
    level,
    setLevel,
    startQuiz,
    name,
    classValue,
    setQuizStructure,
    quizStructure,
  } = useContext(QuizContext)!;

  return (
    <Background>
      <button
        className="absolute bg-blue-600 hover:bg-blue-800 active:bg-blue-900 sm:p-2 sm:px-3 p-1
       rounded-full right-5 sm:right-10 top-5 text-white font-[poppins] flex gap-2 justify-center"
        onClick={() => {
          getAuth().signOut();
        }}
      >
        <span className="material-symbols-outlined relative left-[2px] sm:left-0">
          logout
        </span>
        {window.innerWidth > 640 ? <p>Signout</p> : <></>}
      </button>
      <div className="w-full h-full flex flex-col justify-around items-center select-text">
        <div className="student-box p-3">
          <h2 className="text-center">STUDENT DETAILS</h2>
          <h3>
            Name :{" "}
            <span className={`${name.length > 15 ? "block text-center" : ""}`}>
              {name}
            </span>
          </h3>
          <h3>Class : {classValue}</h3>
        </div>
        <div className="mainpage flex flex-col gap-10 w-full items-center">
          <p className="">CHOOSE DIFFICULTY LEVEL :</p>
          <section className="flex w-full justify-evenly sm:justify-center sm:gap-20">
            <button
              className={`flex flex-col p-2 items-center b1 rounded-xl active:bg-opacity-50 sm:w-40 sm:max-w-full max-w-24 ${
                level == "easy"
                  ? "bg-slate-500 bg-opacity-50"
                  : "hover:bg-slate-400 hover:bg-opacity-30"
              }`}
              onClick={() => {
                setLevel("easy");
              }}
            >
              <img src={easyImage} draggable={false} />
              <p className="text-lg sm:text-2xl px-4 bg-[#49D879]">easy</p>
            </button>
            <button
              className={`flex flex-col p-2 items-center b1 rounded-xl active:bg-opacity-50 sm:w-40 sm:max-w-full max-w-24 ${
                level == "medium"
                  ? "bg-slate-500 bg-opacity-50"
                  : "hover:bg-slate-400 hover:bg-opacity-30"
              }`}
              onClick={() => {
                setLevel("medium");
              }}
            >
              <img src={mediumImage} draggable={false} />
              <p className="text-lg sm:text-2xl px-4 bg-[#FBA43E]">medium</p>
            </button>
            <button
              className={`flex flex-col p-2 items-center b1 rounded-xl active:bg-opacity-50 sm:w-40 sm:max-w-full 
              max-w-24 ${
                level == "hard"
                  ? "bg-slate-500 bg-opacity-50"
                  : "hover:bg-slate-400 hover:bg-opacity-30"
              }`}
              onClick={() => {
                setLevel("hard");
              }}
            >
              <img src={hardImage} draggable={false} />
              <p className="text-lg sm:text-2xl px-4 bg-[#E74B4E]">hard</p>
            </button>
          </section>
          <section className="flex justify-between sm:gap-10 gap-2 w-[90%] md:w-[60%] overflow-hidden">
            <select
              className="bg-[#45938A] w-1/3"
              value={quizStructure.mcq}
              onChange={(e) => {
                setQuizStructure({
                  ...quizStructure,
                  mcq: parseInt(e.target.value),
                });
              }}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  MCQ: {i} Qs
                </option>
              ))}
            </select>
            <select
              className="bg-[#45938A] w-1/3"
              value={quizStructure.matching}
              onChange={(e) => {
                setQuizStructure({
                  ...quizStructure,
                  matching: parseInt(e.target.value),
                });
              }}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  Matching: {i} Qs
                </option>
              ))}
            </select>
            <select
              className="bg-[#45938A] w-1/3"
              value={quizStructure.fill}
              onChange={(e) => {
                setQuizStructure({
                  ...quizStructure,
                  fill: parseInt(e.target.value),
                });
              }}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  Fill: {i} Qs
                </option>
              ))}
            </select>
          </section>
        </div>
        <button
          className="start shadow-xl hover:bg-[#4B70BC] active:bg-[#4464A4]"
          onClick={startQuiz}
        >
          START QUIZ!
        </button>
      </div>
    </Background>
  );
}

export default HomePage;
