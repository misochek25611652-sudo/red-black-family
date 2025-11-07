// src/shared/providers/TelegramProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface TelegramUser {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
}

interface TelegramContextValue {
    user: TelegramUser;
}
const TelegramContext = createContext<TelegramContextValue>({ user: {} });
export const useTelegram = () => useContext(TelegramContext);

interface TelegramProviderProps {
    children: ReactNode;
}

interface ExtendedWebApp {
    initDataUnsafe?: { user?: TelegramUser };
    ready: () => void;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: ExtendedWebApp;
        };
    }
}

export function TelegramProvider({ children }: TelegramProviderProps) {
    const [user, setUser] = useState<TelegramUser>({});

    useEffect(() => {
        const waitForTelegram = setInterval(() => {
            if (window.Telegram?.WebApp) {
                clearInterval(waitForTelegram);
                initTelegram(window.Telegram.WebApp);
            }
        }, 200);

        setTimeout(() => {
            clearInterval(waitForTelegram);
        }, 5000);

        function initTelegram(tg: ExtendedWebApp) {
            setTimeout(() => {
                tg.ready();
            }, 100);

            const tryGetUser = () => {
                const userData = tg.initDataUnsafe?.user;
                if (userData && Object.keys(userData).length > 0) {
                    setUser(userData);
                    return true;
                }
                return false;
            };

            if (!tryGetUser()) {
                const interval = setInterval(() => {
                    if (tryGetUser()) {
                        clearInterval(interval);
                    }
                }, 150);

                setTimeout(() => clearInterval(interval), 3000);
            }
        }
    }, []);

    return (
        <TelegramContext.Provider value={{ user }}>
            {children}
        </TelegramContext.Provider>
    );
}
