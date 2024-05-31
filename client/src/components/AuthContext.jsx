import { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context){
    console.log("error in context");
    
  }
  return context;
};

export const AuthProvider = ({ children }) =>{
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ loggedIn, user, setLoggedIn, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
