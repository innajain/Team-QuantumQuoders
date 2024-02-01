import React from "react";
import Background from "../Background";
import "../styles1.css";
import easyImage from "../assets/Group 27.png";
import hardImage from "../assets/Group 26.png";
import mediumImage from "../assets/Group 28.png";

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
  starQuiz
  return (
    <Background>
      <div className="w-full h-full flex flex-col items-center justify-around">
        <div className="student-box">
          <h2 className="text-center">STUDENT DETAILS:</h2>
          <h3 className="text-left">Name : Arnab</h3>
          <h3 className="text-left">Class : 3</h3>
        </div>
        <div className="mainpage flex flex-col gap-20 w-full">
          <p className="">CHOOSE DIFFICULTY LEVEL :</p>
          <section className="flex w-full justify-evenly">
            <button
              className={`flex flex-col p-2 items-center b1 rounded-xl active:bg-opacity-50 sm:w-40 max-w-20 ${
                level == "easy"
                  ? "bg-slate-500 bg-opacity-50"
                  : "hover:bg-slate-400 hover:bg-opacity-30"
              }`}
              onClick={() => {
                setLevel("easy");
              }}
            >
              <img src={easyImage} draggable={false} />
              <p className="text-lg px-4">easy</p>
            </button>
            <button
              className={`flex flex-col p-2 items-center b1 rounded-xl active:bg-opacity-50 sm:w-40 w-20 ${
                level == "medium"
                  ? "bg-slate-500 bg-opacity-50"
                  : "hover:bg-slate-400 hover:bg-opacity-30"
              }`}
              onClick={() => {
                setLevel("medium");
              }}
            >
              <img src={mediumImage} draggable={false} />
              <p className="text-lg px-4">medium</p>
            </button>
            <button
              className={`flex flex-col p-2 items-center b1 rounded-xl active:bg-opacity-50 sm:w-40 w-20 ${
                level == "hard"
                  ? "bg-slate-500 bg-opacity-50"
                  : "hover:bg-slate-400 hover:bg-opacity-30"
              }`}
              onClick={() => {
                setLevel("hard");
              }}
            >
              <img src={hardImage} draggable={false} />
              <p className="text-lg px-4">hard</p>
            </button>
          </section>
        </div>
        <button className="start shadow-xl hover:bg-[#4B70BC] active:bg-[#4464A4]">
          START QUIZ!
        </button>
      </div>
    </Background>
  );
}

export default HomePage;
