"use client";

import { useEffect, ReactNode } from "react";

interface TelegramProviderProps {
    children: ReactNode;
}

export function TelegramProvider({ children }: TelegramProviderProps) {
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) tg.ready();
    }, []);

    return <>{children}</>;
}
