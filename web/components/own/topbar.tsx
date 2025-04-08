"use client"

import { useHeader } from "../providers/header-title-provider"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Topbar() {
  const { header } = useHeader()


  return (
    <div>
          <motion.span initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} 
          transition={{duration: 0.3, delay: 0.2, type: "spring", stiffness: 200, damping: 12}} 
          exit={{ opacity: 0, x: -20, transition: { delay: (0.1 * header.length + 0.1), duration: 0.1} }} 
          className="text-xl opacity-0">
              <Link href="/">
                Prison Management System
              </Link>
            </motion.span> 
            {header.length > 0
            ? header.map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + (index * 0.1), // opcjonalnie opóźnienie dla każdego
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  exit={{ opacity: 0, x: -20, transition: { delay: ((0.1 * header.length) - 0.1 * index), duration: 0.1 } }}
                  className="opacity-0 text-xl"
                >
                  <Link href={item.href}>
                    {" > "} {item.title}
                  </Link>
                </motion.span>
              ))
            : null}
    </div>
  )
}