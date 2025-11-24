import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
      <UIContext.Provider value={{ menuOpen, setMenuOpen, cartOpen, setCartOpen }}>
        {children}
      </UIContext.Provider>
  );
};
