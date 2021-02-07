import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {}
});

const AuthContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return <AuthContext.Provider value={{ login: handleLogin, isAuthenticated }}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
