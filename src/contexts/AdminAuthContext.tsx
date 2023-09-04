import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface IAuthContext {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    async function fetchUser() {
      if (!userInfo) {
        await axios
          .get("/v1/user/profile")
          .then(({ data }) => setUserInfo(data));
      }
    }
    console.log("fetch");
    fetchUser();
  }, []);

  const contextValue: IAuthContext = {
    userInfo,
    setUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
