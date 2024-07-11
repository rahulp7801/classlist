"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Load collapsed state from local storage on initial load
  useEffect(() => {
    const storedState = localStorage.getItem('navbarCollapsed');
    if (storedState !== null) {
      setCollapsed(storedState === 'true');
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem('navbarCollapsed', newState);
      return newState;
    });
  };

  return (
    <NavbarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);