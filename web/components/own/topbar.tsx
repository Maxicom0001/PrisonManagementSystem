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
        <motion.a initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.3, type: "spring", stiffness: 200, damping: 12}} href="/" className="text-xl">Prison Management System</motion.a> 
        <motion.span initial={{opacity: 0, x: -20}} animate={{opacity: 0.6, x: 0}} transition={{duration: 0.3, delay: 0.25, type: "spring", stiffness: 200, damping: 12}} className="opacity-60 text-xl ">{title != "" ? " > " + title : ""}</motion.span>
    </header>
  )
}