"use client"

import { useHeader } from "../providers/header-title-provider"
import {
    SidebarTrigger
  } from "@/components/ui/sidebar"
  import { motion } from "framer-motion"


export default function Topbar() {
  const { title } = useHeader()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <motion.h1 initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3}} className="text-xl font-semibold"><a href="/">Prison Management System</a> <span  style={{ color: `var(--foreground)` }} className="opacity-60">{title != "" ? "> " + title : ""}</span></motion.h1>
    </header>
  )
}