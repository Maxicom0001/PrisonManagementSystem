"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ScrollingLoaderProps {
  className?: string
  height?: number
  barColor?: string
  indicatorColor?: string
  speed?: number
  width?: string | number
  indicatorWidth?: string
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

export function ScrollingLoader({
  className,
  height = 8,
  barColor,
  indicatorColor,
  speed = 2.0,
  width = "100%",
  indicatorWidth = "30%",
}: ScrollingLoaderProps) {
  return (
    <motion.div      
      className={cn("relative overflow-hidden rounded-full", barColor || "bg-slate-200 dark:bg-slate-800", className)}
      style={{
        height: height,
        width: typeof width === "number" ? `${width}px` : width,
      }}
    >
      <motion.div
        className={cn("absolute h-full rounded-full", indicatorColor || "bg-gradient-to-r from-blue-400 to-blue-600")}
        style={{ width: indicatorWidth }}
        initial={{ left: "-" + indicatorWidth }}
        animate={{ left: "100%" }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: speed,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}