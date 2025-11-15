import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface SidebarProviderProps {
  children: ReactNode;
}

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, setOpen] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    function handleResize() {
      setOpen(window.innerWidth >= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
}
