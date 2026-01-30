import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Skipping google fonts for speed/reliability if net issue
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast-provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TourSafe",
    description: "Tourist Guiding & Safety App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-background font-sans text-foreground">
                <ToastProvider>
                    {children}
                </ToastProvider>
            </body>
        </html>
    );
}
