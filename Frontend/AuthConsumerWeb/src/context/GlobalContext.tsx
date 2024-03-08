import React, { useState } from "react";

interface UserInfo {
  name?: null | string;
  accessToken?: string;
}
interface GlobalContextValue {
  authUser: {
    isLoggedin: boolean;
    userinfo: UserInfo | null;
  };
  setAuthUser: React.Dispatch<
    React.SetStateAction<{
      isLoggedin: boolean;
      userinfo: UserInfo | null;
    }>
  >;
}

export const GlobalContext = React.createContext<Partial<GlobalContextValue>>(
  {}
);

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<{
    isLoggedin: boolean;
    userinfo: UserInfo | null;
  }>({
    isLoggedin: false,
    userinfo: null,
  });

  const value: GlobalContextValue = {
    authUser,
    setAuthUser,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
