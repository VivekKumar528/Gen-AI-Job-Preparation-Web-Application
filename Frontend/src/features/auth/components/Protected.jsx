import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  // Redirect only after the initial session check has finished.
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
