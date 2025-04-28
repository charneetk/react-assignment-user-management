import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User } from "../interfaces/IUser";
import { LoginForm, RegisterForm } from "../interfaces/LoginForm";
import { getUserProfile, loginAPI, registerAPI } from "../services/AuthService";
import { isTokenExpired } from "../utils/validateToken";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  login: (credentials: LoginForm) => void;
  logout: () => void;
  registerUser: (registerData: RegisterForm) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let navigate: NavigateFunction = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      if (isTokenExpired(storedToken)) {
        toast.warning("Session expired. Please log in again.");
        logout(); // Automatically logs out
      } else {
        setCurrentUser(JSON.parse(storedUser));
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + storedToken;
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginForm) => {
    console.log("Login API called");
    setLoading(true);
    await loginAPI(credentials)
      .then(async (res) => {
        console.log("res ", res);
        if (res) {
          const { accessToken, refreshToken, ...user } = res;
          const profile = await getUserProfile(accessToken);

          localStorage.setItem("user", JSON.stringify(profile));
          localStorage.setItem("token", accessToken);

          setCurrentUser(profile);
          setToken(accessToken);

          toast.success("Login Success!");
          navigate("/home");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.warning("Server error occured");
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const registerUser = async (registerData: RegisterForm) => {
    setLoading(true);
    await registerAPI(registerData)
      .then((res) => {
        if (res) {
          toast.success("Register Success . Login To Continue !");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server error occured"))
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, token, login, logout, registerUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
