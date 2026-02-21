import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  userId: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (userId: string, password: string) => boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = (userId: string, password: string) => {
    if (userId === "JackLeoWhite" && password === "445Mighty5") {
      setUser({ userId: "JackLeoWhite", name: "Jack Leo White" });
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setUser(null);
    setIsLoggingOut(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoggingOut }}>
      {children}
    </AuthContext.Provider>
  );
};
