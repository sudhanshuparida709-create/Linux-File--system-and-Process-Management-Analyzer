
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

import type {
  AuthContextType,
  AuthUser,
} from "../types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Restore the authenticated session after a page refresh.
  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  // Authenticate an existing user.
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const authenticatedUser = await loginUser({
          email: email.trim(),
          password,
        });

        setUser(authenticatedUser);
        router.replace("/dashboard");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Login failed."
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Register a new standard user.
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const registeredUser = await registerUser({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        setUser(registeredUser);
        router.replace("/dashboard");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Registration failed."
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // End the authenticated session.
  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutUser();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Logout failed."
      );
      throw err;
    } finally {
      setUser(null);
      setIsLoading(false);
      router.replace("/login");
      router.refresh();
    }
  }, [router]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      refreshUser,
      clearError,
    }),
    [
      user,
      isLoading,
      error,
      login,
      register,
      logout,
      refreshUser,
      clearError,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}
