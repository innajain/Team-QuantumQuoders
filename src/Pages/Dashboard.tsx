import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const auth = getAuth();
  const navigator = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (!user) {
        navigator("/login");
      } else {
        setLoggedIn(true);
      }
    });
    return unsubscribe;
  }, []);
  
  return loggedIn ? (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Performance Dashboard
    </div>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center text-xl font-bold">
      Loading...
    </div>
  );
}

export default Dashboard;
