import { Navigate } from "react-router-dom";
import account from "../utils";
import { useEffect, useState } from 'react';

const Guard = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
        const result = await account.checkRight()

        if (result === "!ok") {
            setIsAuthenticated(false);
        } else if (result === "ok") {
            setIsAuthenticated(true);
        }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        // Loading state, you may want to render a loading spinner or some other UI
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/committee" />;
    } else {
        return children;
    }
};

export default Guard;
