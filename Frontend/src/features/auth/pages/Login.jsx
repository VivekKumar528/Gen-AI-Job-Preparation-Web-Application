import { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, authError, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Wait for authentication to succeed before leaving the login page.
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      // Keep the user on this page and show the API's reason for rejecting login.
      setError(
        err.response?.data?.message || err.message || "Unable to log in.",
      );
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        {(error || authError) && <p role="alert">{error || authError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Prevent duplicate requests and show when the login request is running. */}
          <button className="button primary-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
