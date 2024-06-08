import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userFromStorage = localStorage.getItem('user');
    return userFromStorage ? JSON.parse(userFromStorage) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <StateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};
