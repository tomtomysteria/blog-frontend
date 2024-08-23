"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;  // Typing the children prop correctly
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    // Load token and role from localStorage when the component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (storedToken) {
            setToken(storedToken);
            setRole(storedRole);
        }
    }, []);

    const login = (newToken: string, userRole: string) => {
        setToken(newToken);
        setRole(userRole);
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', userRole); // Storing role in localStorage
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
