"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { clientSessionManager } from "./client-session";
import { Session } from "./session";

interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "staff" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // Subscribe to session changes
    const unsubscribe = clientSessionManager.subscribe((newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
    });

    // Initialize with current session
    const currentSession = clientSessionManager.getSession();
    setSession(currentSession);
    setUser(currentSession?.user || null);
    setIsLoading(false);

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string, role: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const mockUsers = {
          "client@example.com": { name: "John Doe", role: "client" },
          "staff@example.com": { name: "Dr. Sarah Johnson", role: "staff" },
          "admin@example.com": { name: "Admin Manager", role: "admin" }
        };

        const user = mockUsers[email as keyof typeof mockUsers];
        
        if (user && password === "password" && user.role === role) {
          try {
            // Create session using client session manager
            const newSession = clientSessionManager.createMockSession(email, role);
            clientSessionManager.setSession(newSession);
            resolve();
          } catch {
            reject(new Error("Failed to create session"));
          }
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    clientSessionManager.clearSession();
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 