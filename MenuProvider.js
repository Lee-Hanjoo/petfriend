import React, { createContext, useState, useContext } from 'react';

// Context 생성
const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext); // 간편하게 사용하기 위한 훅

export function MenuProvider({ children }) {
  const [menuActive, setMenuActive] = useState('home');
  
  return (
    <MenuContext.Provider value={{ menuActive, setMenuActive }}>
      {children}
    </MenuContext.Provider>
  );
}
