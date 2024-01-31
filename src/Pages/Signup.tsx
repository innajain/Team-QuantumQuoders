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
      alert("Please enter both name and class.");
    } else {
      // Redirect to Q1
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, name+"@gmail.com", password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          // Store user data in Firestore
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid);
          setDoc(userRef, {classValue})
            .then(() => {
              navigator("/quiz");
            })
            .catch((error) => {
              console.error("Error storing user data:", error);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }

  return !loggedIn ? (
    <Background>
      <div className="w-full h-full flex justify-center items-center">

      <div className="bg-[#6AC3B9] rounded-[30px] max-h-[90%] max-w-[90%] flex flex-col">
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
      <form id="loginForm" className="mt-[10%] flex flex-col gap-2 items-center">
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
          <label htmlFor="password" className="na flex flex-col gap-3 sm:text-xl">
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
    </div>
      </div>
    </Background>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>);
}

export default Signup;
