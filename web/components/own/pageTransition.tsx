// components/PageEntryAnimation.tsx
"use client";

import { motion } from "framer-motion";
import { ScrollingLoader } from "./scrolling-loader";

export default function PageEntryAnimation() {
    return (
        <motion.div
            key="page-loader"
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0, 1, 0],
                }}
                exit={{ scale: 0.95, rotate: 0, opacity: 0 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                className="text-2xl font-semibold text-gray-800 dark:text-gray-100"
            >
                <p className="flex justify-center p-5">Loading</p>
                <ScrollingLoader width={200} height={8} speed={0.7} indicatorColor="bg-gray-200"></ScrollingLoader>
            </motion.div>
        </motion.div>
    );
}
