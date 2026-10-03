import { useState, useEffect } from "react";
import { getMe } from "./services/auth.api";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        // A 401 simply means this visitor has not logged in yet.
        if (error.response?.status !== 401) {
          setAuthError(
            error.response?.data?.message ||
              error.message ||
              "Unable to verify your login.",
          );
        }
      } finally {
        // Let protected routes render even if there is no existing session.
        setLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
