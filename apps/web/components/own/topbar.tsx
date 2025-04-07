"use client"

import { useHeader } from "../providers/header-title-provider"
import {
    SidebarTrigger
  } from "@/components/ui/sidebar"

export default function Topbar() {
  const { title } = useHeader()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  )
}