"use client"

import type * as React from "react"
import AppSidebar from "@/components/own/sidebar"
import { HeaderProvider } from "../providers/header-title-provider"
import Topbar from "../own/topbar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <HeaderProvider>
      <SidebarProvider>
        <div className="flex min-h-screen min-w-screen">
          <AppSidebar />
          <SidebarInset>
            <Topbar/>
            <main className="flex items-center justify-center h-full w-full">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </HeaderProvider>
  )
}


