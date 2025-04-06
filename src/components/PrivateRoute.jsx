import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Wait for Clerk to load

  return isSignedIn ? children : <Navigate to="/register" />;
};

export default PrivateRoute;
