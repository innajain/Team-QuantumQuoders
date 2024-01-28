import React from "react";
import bearGif from "./assets/2a0d494ad03edeb4653af8e20d8ea15f.gif";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigator = useNavigate();

  function validateLogin() {
    if (name.trim() === "" || password.trim() === "") {
      alert("Please enter both name and class.");
    } else {
      // Redirect to Q1
      const auth = getAuth();
      signInWithEmailAndPassword(auth, name + "@gmail.com", password)
        .then(() => {
          navigator("/quiz")
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
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

        <label htmlFor="password" className="na">
          Password:
        </label>
        <input
          type="text"
          id="password"
          name="password"
          required
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            validateLogin();
          }}
          className="mt-8 mb-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;