// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import {jwtDecode} from "jwt-decode"

interface Account {
  userName: string;
  role: string;
  email: string;
  fullName: string;
  // Thêm các field khác nếu cần
}

interface AuthContextType {
  user: Account | null;
  token: string | null;
  isLoading: boolean;
  login: (user: Account, token: string) => void;
  logout: () => void;
}

interface JwtPayload {
  exp: number; // expiration time
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("account");
    const token = localStorage.getItem("token");
    if (stored && token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
        if (decoded.exp > now) {
          // Token hợp lệ, cập nhật user và token
          setUser(JSON.parse(stored));
          setToken(token);
        }
        else {
          // Token đã hết hạn, xóa thông tin
          localStorage.removeItem("account");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        localStorage.removeItem("account");
        localStorage.removeItem("token");
      }
      setUser(JSON.parse(stored));
      setToken(token);
    }
     setIsLoading(false);
  }, []);

  const login = (user: Account, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("account", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("account");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng dễ hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
