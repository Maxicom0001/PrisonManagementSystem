"use client"

import { useHeader } from "@/components/providers/header-title-provider"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function Custom404() {
    const { setTitle } = useHeader()

    useEffect(() => {
        setTitle("404 Page Not Found")
    },[])
    

    return (
        <div className="flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6 max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <AlertCircle className="mx-auto h-24 w-24 text-muted-foreground" />
        </motion.div>

        <motion.h1
          className="text-4xl font-extrabold tracking-tight lg:text-5xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Sorry, we couldn't find the page you're looking for. The page might have been removed or the URL might be
          incorrect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </motion.div>
      </div>
    </div>
    )
  }