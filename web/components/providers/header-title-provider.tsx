// components/layout/header-context.tsx
"use client";

import { createContext, useContext, useState } from "react";

type HeaderContextType = {
    header: {
        title: string;
        href: string;
    }[];
    setHeader: (data: { title: string; href: string }[]) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
    const [header, setHeaderState] = useState([{ title: "", href: "" }]);

    const setHeader = (newHeader: { title: string; href: string }[]) => {
        setTimeout(() => {
            setHeaderState(newHeader);
        }, 300); // Opóźnienie w ms (możesz dostosować ten czas)
    };

    return <HeaderContext.Provider value={{ header, setHeader }}>{children}</HeaderContext.Provider>;
}

export function useHeader() {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within a HeaderProvider");
    }
    return context;
}
