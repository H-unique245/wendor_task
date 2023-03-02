import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userToken, setUserToken] = useState("");
  
  const loginUser = (token) => {
    setUserToken(token);
    setIsAuth(true);
  };
  const logoutUser = () => {
    setUserToken(null);
    localStorage.removeItem("userToken")
    setIsAuth(false);
  };

  return (
    <AppContext.Provider
      value={{ isAuth, loginUser, logoutUser, userToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
