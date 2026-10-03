import { useContext } from "react";
import { AuthContext } from "../auth.context.js";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading, authError, setAuthError } = context;

  const handleLogin = async ({ email, password }) => {
    setAuthError("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      // Update shared auth state so protected routes recognize the new session.
      setUser(data.user);
    } finally {
      // Always clear loading, including when the API request fails.
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setAuthError("");
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } finally {
      // Allow the form to be used again after success or failure.
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    authError,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
