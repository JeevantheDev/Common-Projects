import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(GlobalContext);

  const onClickGoogleAuth = async () => {
    try {
      const authWindow = window.open(
        "http://localhost:8000/api/v1/auth/google"
      );

      const intervalId = setInterval(() => {
        try {
          if (authWindow?.location.href.includes("http://localhost:5173/")) {
            const accessToken = new URL(
              authWindow.location.href
            ).searchParams.get("accessToken");

            authWindow.close();

            setAuthUser &&
              setAuthUser(() => ({
                isLoggedin: true,
                userinfo: {
                  name: null,
                  accessToken: accessToken || "",
                },
              }));

            // Stop the interval
            clearInterval(intervalId);
          }
        } catch (error) {
          // Handle possible security exceptions due to cross-origin access
          console.error("Error accessing authWindow:", error);
        }
      }, 1000);

      // }, 1000);
    } catch (error) {
      console.log("error:: ", error);
    }
  };

  if (authUser?.isLoggedin) {
    navigate("/home");
  }

  return (
    <button onClick={onClickGoogleAuth} id="login-btn">
      Login with Google
    </button>
  );
};

export default Login;
