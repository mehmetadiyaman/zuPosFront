import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  branchNo: string;
  branchName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    username: string,
    password: string,
    branchNo: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthContext'i export et (useAuth hook için)
export { AuthContext };

// ZuPOS ASP.NET Core endpoint'leri (environment variables'dan alınır)
const WEB_PANEL_URL =
  import.meta.env.VITE_WEB_PANEL_URL || "http://localhost:5287";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5185/api";

// Debug için URL'leri console'a yazdır
console.log("Environment Variables:", {
  WEB_PANEL_URL,
  API_BASE_URL,
  env: import.meta.env,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Axios interceptor - JWT token'ı otomatik ekler (session-based hariç)
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (token && token !== "session-based") {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  // Sayfa yüklendiğinde token kontrolü
  useEffect(() => {
    const checkAuth = async () => {
      if (token === "session-based") {
        // Session tabanlı login için user bilgileri localStorage'da
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
            console.log("🔄 Session restore başarılı");
          } catch {
            // Corrupt data varsa temizle
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setToken(null);
          }
        }
      } else if (token) {
        try {
          // JWT token ile kullanıcı bilgilerini kontrol et
          const response = await axios.get(
            `${API_BASE_URL}/Auth/GetCurrentUser`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data.data || response.data);
        } catch {
          // Token geçersizse temizle
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Session validation - gerçekten login olup olmadığını kontrol eder
  const validateSession = async (): Promise<boolean> => {
    try {
      // ASP.NET'te login sonrası Home/Index'e redirect olur
      const response = await axios.get(`${WEB_PANEL_URL}/Home/Index`, {
        withCredentials: true,
        timeout: 5000,
      });

      if (response.status === 200) {
        const responseText = response.data?.toString() || "";

        // Eğer login sayfasına redirect olduysa session geçersiz
        if (responseText.includes("Login") || responseText.includes("Giriş")) {
          return false;
        }

        return true;
      }

      return false;
    } catch (error) {
      console.log("❌ Session validation hatası:", error);
      return false;
    }
  };

  const login = async (
    username: string,
    password: string,
    branchNo: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      // ZuPOS Web Panel SignIn endpoint'i
      const response = await axios.post(
        `${WEB_PANEL_URL}/Login/SignIn`,
        {
          BranchNo: branchNo,
          UserName: username,
          Password: password,
          IsRememberMe: false,
        },
        {
          withCredentials: true, // Cookie'leri dahil et
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "text/html,application/json",
          },
          timeout: 10000, // 10 saniye timeout
        }
      );

      // MVC Controller response kontrolü
      if (response.status === 200) {
        // Session validation - gerçekten başarılı mı kontrol et
        const isValid = await validateSession();

        if (isValid) {
          const userInfo = {
            id: `user_${username}_${branchNo}`,
            username: username,
            branchNo: branchNo,
            branchName: `Şube ${branchNo}`,
            role: "user",
          };

          setUser(userInfo);
          setToken("session-based");
          localStorage.setItem("token", "session-based");
          localStorage.setItem("user", JSON.stringify(userInfo));

          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error: unknown) {
      const axiosError = error as {
        message?: string;
        response?: {
          status?: number;
          statusText?: string;
          data?: unknown;
        };
      };
      console.error("Login error details:", {
        message: axiosError.message || "Unknown error",
        status: axiosError.response?.status || "N/A",
        statusText: axiosError.response?.statusText || "N/A",
        data: axiosError.response?.data || "No data",
        url: `${API_BASE_URL}/Auth/Login`,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);

    // Session tabanlı login için Web Panel logout endpoint'ini çağır
    if (token === "session-based") {
      axios
        .post(`${WEB_PANEL_URL}/Login/Logout`, {}, { withCredentials: true })
        .catch((err) => console.log("Logout error:", err));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
