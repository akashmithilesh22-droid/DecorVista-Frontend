import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  sessionId: string;
};

type SessionContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("decorvista-user");
      if (!stored) return null;

      const parsed: User = JSON.parse(stored);

      // 🔒 Guard against invalid / fake session IDs
      if (
        !parsed.sessionId ||
        parsed.sessionId === "auth-session" ||
        parsed.sessionId.length !== 24
      ) {
        localStorage.removeItem("decorvista-user");
        localStorage.removeItem("decorvista-sessionId");
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  });

  const login = (userData: User) => {
    // 🔒 HARD GUARD (prevents your exact bug forever)
    if (
      !userData.sessionId ||
      userData.sessionId === "auth-session" ||
      userData.sessionId.length !== 24
    ) {
      throw new Error(
        "Invalid sessionId passed to login(). Must be MongoDB ObjectId."
      );
    }

    localStorage.setItem("decorvista-user", JSON.stringify(userData));
    localStorage.setItem("decorvista-sessionId", userData.sessionId);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("decorvista-user");
    localStorage.removeItem("decorvista-sessionId");
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
