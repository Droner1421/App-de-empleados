import React, { createContext, useState, ReactNode } from "react";

export interface ApiConfigContextProps {
    apiIP: string;
    setApiIP: (ip: string) => void;
}

export const ApiConfigContext = createContext({} as ApiConfigContextProps);

export const ApiConfigProvider = ({ children }: { children: ReactNode }) => {
    const [apiIP, setApiIP] = useState("http://Tu_ip:3000");

    return (
        <ApiConfigContext.Provider value={{ apiIP, setApiIP }}>
            {children}
        </ApiConfigContext.Provider>
    );
};
