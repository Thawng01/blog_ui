import React, { createContext, useState } from "react";
import type { AuthUser } from "../type";

export interface AuthContextValue {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    let userInfo: any;
    const value = localStorage.getItem("user");
    if (value) userInfo = JSON.parse(value);
    const [user, setUser] = useState<AuthUser | null>(userInfo || null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
