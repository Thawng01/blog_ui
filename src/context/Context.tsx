import React, { createContext, useState } from "react";

interface UserContext {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextValue {
    user: UserContext | null;
    setUser: React.Dispatch<React.SetStateAction<UserContext | null>>;
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
    const [user, setUser] = useState<UserContext | null>(userInfo || null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
