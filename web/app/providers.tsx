import { MainLayout } from "@/components/layout/main-layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <head />
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <MainLayout>{children}</MainLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
