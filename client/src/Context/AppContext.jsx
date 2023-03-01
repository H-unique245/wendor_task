import { createContext, useState } from "react";


export const AppContext= createContext();

const AppContextProvider=({children})=>{
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState("");
    const toggleAuth = () => {
        setIsAuth(!isAuth);
      };
      const loginUser = (token) => {
        setToken(token);
        setIsAuth(true);
      };
      const logoutUser = () => {
        setToken(null);
        setIsAuth(false);
      };
    
    return (
        <AppContext.Provider value={{  isAuth, toggleAuth, loginUser, logoutUser, token  }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
