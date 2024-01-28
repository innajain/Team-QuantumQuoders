import React from "react";
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
    <div className="container flex flex-col">
      <div
        className="rounded-full overflow-hidden w-[40%] aspect-square bg-[#E99A67] 
        p-1 my-6 self-center flex justify-center"
      >
        <img
          src={bearGif}
          alt="Animated GIF"
          className="gi relative bottom-[-4%]"
          draggable={false}
        />
      </div>
      <form id="loginForm" className="mt-[10%]">
        <label htmlFor="name" className="na">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="class" className="lab">
          Class:
        </label>
        <select id="class" name="class" required className="sel" onChange={(e) => {
          setClassValue(e.target.value);
        }}>
          <option value="" disabled selected>
            Select your class
          </option>
          {Array.from({ length: 6 }, (_, i) => i + 1).map((i) => (
            <option key={i} value={i}>Class {i}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            validateLogin();
          }}
          className="my-8"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default App;
