import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem("userid") || null);

    useEffect(() => {
        setUserId(localStorage.getItem("userid"));
    }, []);

    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
