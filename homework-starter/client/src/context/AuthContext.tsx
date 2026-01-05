import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { fetchMe, User } from "../api/User";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { token?: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token || document.cookie.includes("auth=")) {
      fetchMe()
        .then(setUser)
        .catch(() => logout());
    }
  }, [token]);

  const login = ({ token, user }: { token?: string; user: User }) => {
    if (token) {
      setToken(token);
      localStorage.setItem("token", token);
    }
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth должен использоваться как AuthProvider");
  }

  return context;
};
