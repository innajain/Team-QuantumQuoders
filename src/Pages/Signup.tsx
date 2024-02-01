import React, { useEffect } from "react";
import bearGif from "../assets/2a0d494ad03edeb4653af8e20d8ea15f.gif";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Background from "../Background";

function Signup() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [classValue, setClassValue] = React.useState("");
  const navigator = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const auth = getAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<
    | "Please enter a name."
    | "Please enter a password."
    | "Please select a class."
    | "User already exists. Please login"
    | ""
    | "Password is too short"
  >();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigator("/quiz");
      }
      setLoggedIn(false);
    });
    return unsubscribe;
  }, []);

  function validateSignup() {
    if (
      name.trim() === "" ||
      classValue.trim() === "" ||
      password.trim() === ""
    ) {
      if (name.trim() === "") {
        setMessage("Please enter a name.");
        return;
      }
      if (password.trim() === "") {
        setMessage("Please enter a password.");
        return;
      }
      if (classValue.trim() === "") {
        setMessage("Please select a class.");
        return;
      }
    } else {
      setIsLoading(true);
      setMessage("");
      // Redirect to Q1
      const auth = getAuth();
      const emailId = name.replace(" ", "") + "@gmail.com";
      createUserWithEmailAndPassword(auth, emailId, password)
        .then((userCredential) => {
          setIsLoading(false);
          // Signed up
          const user = userCredential.user;

          // Store user data in Firestore
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, { classValue, name })
            .then(() => {
              navigator("/quiz");
            })
            .catch((error) => {
              console.error("Error storing user data:", error);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          const errorMessage = error.message;
          if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            setMessage("User already exists. Please login");
            return;
          }
          if (
            errorMessage ==
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            setMessage("Password is too short");
            return;
          }
          alert(errorMessage);
        });
    }
  }

  return !loggedIn ? (
    <Background>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#6AC3B9] rounded-[30px] max-h-[90%] max-w-[90%] flex flex-col relative">
          <span
            className="absolute top-0 w-full text-center -translate-y-full text-gray-600 
        flex gap-2 justify-center sm:text-lg font-[poppins]"
          >
            Already have an account:
            <button
              className="text-blue-600 underline hover:text-blue-800"
              onClick={() => {
                navigator("/login");
              }}
            >
              Login
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
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="sm:text-xl"
              required
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="password"
              className="na flex flex-col gap-3 sm:text-xl"
            >
              Password:
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="sm:text-xl"
              required
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="class" className="lab">
              Class:
            </label>
            <select
              id="class"
              name="class"
              required
              className="sel sm:text-xl"
              onChange={(e) => {
                setClassValue(e.target.value);
              }}
              defaultValue={""}
            >
              <option value="" disabled className="text-slate-300 sm:text-xl">
                Select your class
              </option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                <option key={i} value={i}>
                  Class {i}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                validateSignup();
              }}
              className="btn mt-8 mb-4"
            >
              Signup
            </button>
          </form>
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

export default Signup;
