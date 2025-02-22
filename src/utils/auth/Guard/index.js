import { Navigate } from "react-router-dom";
import account from "../utils";
import { useEffect, useState } from 'react';

const Guard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await account.isLogged();
      setIsAuthenticated(result);
    };

    checkAuth();
  }, []);
  if (isAuthenticated === null) {
    // Loading state, you may want to render a loading spinner or some other UI
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default Guard;
