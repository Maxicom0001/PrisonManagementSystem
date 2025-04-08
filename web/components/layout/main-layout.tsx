"use client"

import type * as React from "react"
import AppSidebar from "@/components/own/sidebar"
import { HeaderProvider } from "../providers/header-title-provider"
import Topbar from "../own/topbar"

import {
  SidebarInset,
  SidebarProvider,
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
  return (
    <HeaderProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex min-h-screen min-w-screen" >
          {/* Sidebar */}
          <div className="shrink-0">
            <AppSidebar />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col w-full">
            <SidebarInset className="flex flex-col flex-1">
              <Topbar />
              <main className="flex-1 flex items-center justify-center">
                {children}
              </main>
            </SidebarInset>
          </div>
        </div>
        </QueryClientProvider>
      </SidebarProvider>
    </HeaderProvider>
  )
}


