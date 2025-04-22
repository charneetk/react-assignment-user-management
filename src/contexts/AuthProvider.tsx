import { createContext, useState, ReactNode, useContext } from "react";
import { User } from "../interfaces/IUser";

// 1. Define the shape of the auth state
interface AuthState {
  user?: User;
}

// 2. Define the shape of the context
interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

// 3. Create the context with undefined as default (safer)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 5. Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
