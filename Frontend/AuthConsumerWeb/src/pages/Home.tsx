import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(GlobalContext);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/me", {
        headers: {
          authorization: `Bearer ${authUser?.userinfo?.accessToken || ""}`,
        },
      });

      const data = await res.json();
      setAuthUser &&
        setAuthUser((prev) => ({
          isLoggedin: true,
          userinfo: {
            accessToken: prev?.userinfo?.accessToken,
            name: (data?.data?.displayName as string) || "",
          },
        }));
    } catch (error) {
      console.log("error:: ", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (!authUser?.isLoggedin) {
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome, {authUser?.userinfo?.name}</h1>
      <button
        onClick={() => {
          setAuthUser &&
            setAuthUser({
              isLoggedin: false,
              userinfo: null,
            });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
