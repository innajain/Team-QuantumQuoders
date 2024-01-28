import React from "react";
import "./styles.css";
import Background from "./Background";
import bearGif from "./assets/2a0d494ad03edeb4653af8e20d8ea15f.gif";

function App() {
  const [name, setName] = React.useState("");
  const [classValue, setClassValue] = React.useState("");

  function validateLogin() {
    if (name.trim() === "" || classValue.trim() === "") {
      alert("Please enter both name and class.");
    } else {
      alert("Login successful!\nName: " + name + "\nClass: " + classValue);
      // Redirect to Q1
    }
  }

  return (
    <Background>
      <div className="container w-[500px] h-[95%] bg-[#6AC3B9] p-10 rounded-[40px] z-10 font-sans flex flex-col items-center justify-between">
        <div className="rounded-full overflow-hidden w-[35%] aspect-square bg-[#E99A67] p-1 my-6">
          <img src={bearGif} alt="" className="relative bottom-[-16%]" draggable={false}/>
        </div>
        <form id="loginForm" className="flex flex-col w-full text-lg">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mb-4 p-2 rounded-full text-center text-lg"
            placeholder="Enter your name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateLogin();
              }
            }}
          />

          <label htmlFor="class">Class</label>
          <select
            id="class"
            name="class"
            className="mb-4 py-2 px-8 rounded-lg bg-[#45938A] text-center"
            required
            onChange={(e) => {
              const selectedClass = e.target.value;
              console.log("Selected Class:", selectedClass);
              setClassValue(selectedClass);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                validateLogin();
              }
            }}
          >
            <option value="" disabled selected className="text-slate-300">
              Select your class
            </option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1} >
                Class {index + 1}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => validateLogin()}
            className="bg-[#546ADA] w-fit p-2 px-5 text-white font-bold rounded-lg self-center my-5"
          >
            START QUIZ
          </button>
        </form>
      </div>
    </Background>
  );
}

export default App;
