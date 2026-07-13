"use client";

import { createContext, useContext } from "react";
import type { NavDropdownState } from "@/lib/nav/use-nav-dropdown-state";

const NavDropdownContext = createContext<NavDropdownState | null>(null);

export function NavDropdownProvider({
  value,
  children,
}: {
  value: NavDropdownState;
  children: React.ReactNode;
}) {
  return (
    <NavDropdownContext.Provider value={value}>{children}</NavDropdownContext.Provider>
  );
}

export function useNavDropdown() {
  const ctx = useContext(NavDropdownContext);
  if (!ctx) {
    throw new Error("useNavDropdown must be used within NavDropdownProvider");
  }
  return ctx;
}
