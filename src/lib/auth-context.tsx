"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { dummyUser, type DummyUser } from "@/lib/dummy-data";

interface AuthContextType {
  user: DummyUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "cms_auth_user";

// Valid credentials for dummy login
const VALID_CREDENTIALS = [
  { email: "admin@example.com", password: "Password@123" },
  { email: "editor@example.com", password: "Password@123" },
  { email: "marketing@example.com", password: "Password@123" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DummyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    (email: string, password: string): boolean => {
      const isValid = VALID_CREDENTIALS.some(
        (cred) => cred.email === email && cred.password === password,
      );

      if (!isValid) return false;

      const loggedInUser = { ...dummyUser, email };
      setUser(loggedInUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
      router.push("/dashboard");
      return true;
    },
    [router],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
