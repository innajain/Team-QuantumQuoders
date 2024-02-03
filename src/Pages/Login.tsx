import React, { useEffect } from "react";
import bearGif from "../assets/2a0d494ad03edeb4653af8e20d8ea15f.gif";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Background from "../Background";

function Login() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigator = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const auth = getAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<
    | "Please enter a name."
    | "Incorrect password."
    | "Please enter a password."
    | "User not found. Please signup."
    | ""
  >("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigator("/quiz");
      }
      setLoggedIn(false);
    });
    return unsubscribe;
  }, []);

  function validateLogin() {
    if (name.trim() === "" || password.trim() === "") {
      if (name.trim() === "") {
        setMessage("Please enter a name.");
        return;
      }
      if (password.trim() === "") {
        setMessage("Please enter a password.");
        return;
      }
      return;
    }
    setMessage("");
    setIsLoading(true);
    // Redirect to Q1
    const auth = getAuth();
    const emailId = name.replace(/ /g, "") + "@gmail.com";
    console.log(emailId)
    signInWithEmailAndPassword(auth,emailId, password)
      .then(() => {
        setIsLoading(false);
        navigator("/quiz");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          setMessage("User not found. Please signup.");
          return;
        }
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          setMessage("Incorrect password.");
          return;
        }
        alert(errorMessage);
        console.log(errorMessage);
      });
  }

  return !loggedIn ? (
    <Background>
      <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center relative">

        <div className="bg-[#6AC3B9] rounded-[30px] flex flex-col relative">
          <span
            className="absolute top-0 w-full text-center -translate-y-full text-gray-600 
        flex gap-2 justify-center sm:text-lg font-[poppins]"
          >
            Create new account:
            <button
              className="text-blue-600 underline hover:text-blue-800"
              onClick={() => {
                navigator("/signup");
              }}
            >
              Signup
            </button>
          </span>
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
          <form
            id="loginForm"
            className="mt-[10%] flex flex-col gap-2 items-center"
          >
            <label htmlFor="name" className="na flex flex-col gap-3 sm:text-xl">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                className="sm:text-xl"
                required
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label
              htmlFor="password"
              className="na flex flex-col gap-3 sm:text-xl"
            >
              Password:
              <input
                type="text"
                id="password"
                name="password"
                className="sm:text-xl"
                required
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              type="button"
              onClick={() => {
                validateLogin();
              }}
              className="btn mt-8 mb-4"
            >
              Login
            </button>
          </form>

        </div>
          {isLoading ? (
            <span
              className="absolute bottom-0 w-full text-center translate-y-full 
        text-gray-600 sm:text-xl font-bold p-3"
            >
              Loading...
            </span>
          ) : (
            <></>
          )}

          <span
            className="absolute bottom-0 w-full text-center translate-y-full 
        text-red-600 sm:text-xl font-bold p-3"
          >
            {message}
          </span>
        </div>
      </div>
    </Background>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}

export default Login;
