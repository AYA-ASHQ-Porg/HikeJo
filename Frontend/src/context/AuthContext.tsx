// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  signupAdventurer,
  signupCompany,
  loginAdventurer,
  loginCompany,
  resetPasswordRequest,
  updatePasswordRequest,
} from "@/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  type: "adventurer" | "company";
  token: string;
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  name: string;
  gender: string;
  age: number;
  email: string;
  phoneNumber: string;
  city: string;
  type: "adventurer" | "company";
  companyName?: string;
  companyId?: string;
  location?: string;
  yearsInBusiness?: number;
  password?: string;
}

interface AuthContextProps {
  user: User | null;
  signup: (userData: SignupPayload, password: string) => Promise<void>;
  login: (
    identifier: string,
    password: string,
    userType: "adventurer" | "company"
  ) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (
    email: string,
    code: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
  userType: "adventurer" | "company" | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const loadedUser = parsed.adventurer || parsed.company;
      setUser({
        ...loadedUser,
        token: parsed.token,
        type: parsed.adventurer ? "adventurer" : "company",
      });
    }
  }, []);

  const signup = async (userData: SignupPayload, password: string) => {
    const payload = { ...userData, password };
    console.log("Payload sent to backend:", payload);

    try {
      let res;

      if (userData.type === "adventurer") {
        res = await signupAdventurer({ ...payload, type: "adventurer" });
        const storedUser = {
          adventurer: res.data.data.adventurer,
          token: res.data.data.token,
        };
        setUser({
          ...res.data.data.adventurer,
          token: res.data.data.token,
          type: "adventurer",
        });
        localStorage.setItem("user", JSON.stringify(storedUser));
      } else if (userData.type === "company") {
        res = await signupCompany({
          ...(payload as Required<SignupPayload>),
          type: "company",
        });
        const storedUser = {
          company: res.data.data.company,
          token: res.data.data.token,
        };
        setUser({
          ...res.data.data.company,
          token: res.data.data.token,
          type: "company",
        });
        localStorage.setItem("user", JSON.stringify(storedUser));
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Signup failed:", err?.response?.data || err);
      throw new Error(err?.response?.data?.message || "Signup failed");
    }
  };

  const login = async (
    identifier: string,
    password: string,
    userType: "adventurer" | "company"
  ) => {
    try {
      let res;

      if (userType === "adventurer") {
        res = await loginAdventurer({ email: identifier, password });
        const storedUser = {
          adventurer: res.data.data.adventurer,
          token: res.data.data.token,
        };
        setUser({
          ...res.data.data.adventurer,
          token: res.data.data.token,
          type: "adventurer",
        });
        localStorage.setItem("user", JSON.stringify(storedUser));
      } else {
        res = await loginCompany({ companyId: identifier, password });
        const storedUser = {
          company: res.data.data.company,
          token: res.data.data.token,
        };
        setUser({
          ...res.data.data.company,
          token: res.data.data.token,
          type: "company",
        });
        localStorage.setItem("user", JSON.stringify(storedUser));
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Login failed:", err?.response?.data || err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const resetPassword = async (email: string) => {
    try {
      await resetPasswordRequest(email);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Failed to send reset code"
      );
    }
  };

  const updatePassword = async (
    email: string,
    code: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await updatePasswordRequest(email, code, newPassword, confirmPassword);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err?.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        resetPassword,
        updatePassword,
        userType: user?.type || null,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
