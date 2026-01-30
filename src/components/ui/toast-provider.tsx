"use client";
import React, { createContext, useContext, useState } from "react";
import { X } from "lucide-react";

type ToastType = { id: string; title?: string; description?: string };

const ToastContext = createContext<{ toast: (t: Omit<ToastType, "id">) => void }>({
    toast: () => { },
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const toast = (t: Omit<ToastType, "id">) => {
        const id = Math.random().toString(36);
        setToasts((prev) => [...prev, { ...t, id }]);
        setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 3000);
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded pl-4 pr-8 py-3 shadow-lg w-80 relative animate-in slide-in-from-right fade-in duration-300">
                        {t.title && <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{t.title}</div>}
                        {t.description && <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t.description}</div>}
                        <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
