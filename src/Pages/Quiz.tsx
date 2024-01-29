import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigator = useNavigate();
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigator("/login");
      }
      setLoggedIn(true);
    });
    return unsubscribe;
  }, []);

  return loggedIn ? (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Quiz
    </div>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}

export default Quiz;
