"use client"

import type * as React from "react"
import AppSidebar from "@/components/own/sidebar"
import { HeaderProvider } from "../providers/header-title-provider"
import Topbar from "../own/topbar"
import {AnimatePresence} from "framer-motion"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

interface MainLayoutProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function MainLayout({ children }: MainLayoutProps) {

  const pathname = usePathname();
  const [showContent, setShowContent] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);
  const [currentChildren, setCurrentChildren] = useState(children);


  useEffect(() => {
    // Jeśli ścieżka się zmienia, chowa aktualny content
    if (pathname !== currentPath) {
      setShowContent(false);
    }
  }, [pathname]);

  useEffect(() => {
    // Po zakończeniu animacji exit, zaktualizuj aktualną stronę
    if (showContent) {
      setCurrentChildren(children);  // tylko teraz renderujemy nową stronę
    }
  }, [showContent, children]);

  return (
    <HeaderProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen min-w-screen">
            {/* Sidebar */}
            <div className="shrink-0">
              <AppSidebar />
            </div>

            {/* Main content area */}
                <div
                  className="flex-1 flex flex-col w-full"
                >
                  <SidebarInset className="flex flex-col flex-1">
                  {/* Header */}
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <AnimatePresence
                      mode="wait"
                      onExitComplete={() => {
                        // Po zakończeniu animacji exit, ustaw nową stronę
                        setTimeout(() => {
                          setCurrentPath(pathname)  // Zaktualizuj ścieżkę
                          setShowContent(true)      // Pokaż nową stronę
                        }, 300);
                      }}
                    > 
                    {/* Animacja przejścia */}
                      <Topbar key={pathname}/>
                    </AnimatePresence>
                  </header>
                    <main className="flex-1 flex items-center justify-center">
                      {/* opóźnienie animacji */}
                      {showContent && (
                        children
                      )}
                    </main>
                  </SidebarInset>
                </div>
          </div>
        </QueryClientProvider>
      </SidebarProvider>
    </HeaderProvider>
  );
}


