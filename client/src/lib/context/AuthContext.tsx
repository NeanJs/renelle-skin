import { createContext, useContext, useEffect, useState } from "react";

import { getCustomer } from "@/lib/api/auth";

interface AuthContextType {
  customer: any;

  loading: boolean;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);

      return;
    }

    getCustomer()
      .then((data) => {
        setCustomer(data);
      })

      .catch(() => {
        localStorage.removeItem("token");
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    setCustomer(null);
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return ctx;
}
