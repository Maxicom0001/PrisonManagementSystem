"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TextSkeletonProps {
  className?: string
  lines?: number
  width?: string | number
  height?: number
}

export function TextSkeleton({ className, lines = 1, width = "100%", height = 16 }: TextSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array(lines)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800 shadow-sm"
            style={{
              width: typeof width === "number" ? `${width}px` : width,
              height: height,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </div>
        ))}
    </div>
  )
}