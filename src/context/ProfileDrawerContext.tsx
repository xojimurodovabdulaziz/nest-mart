import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ProfileDrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ProfileDrawerContext = createContext<ProfileDrawerContextValue | undefined>(undefined);

export const ProfileDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileDrawerContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </ProfileDrawerContext.Provider>
  );
};

export const useProfileDrawer = () => {
  const ctx = useContext(ProfileDrawerContext);
  if (!ctx) throw new Error("useProfileDrawer must be used within ProfileDrawerProvider");
  return ctx;
};
