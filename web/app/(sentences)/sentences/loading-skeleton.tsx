"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Loading() {
    // Animation variants for container
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    // Animation variants for items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <div className="container mx-auto py-8">
            <Skeleton className="h-10 w-64 mb-6" />

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" animate="show">
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div key={i} variants={itemVariants}>
                        <Card className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0.8 }}
                                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5 }}
                                    >
                                        <Skeleton className="h-6 w-40" />
                                    </motion.div>
                                    <div className="flex gap-2">
                                        <motion.div
                                            initial={{ opacity: 0.5 }}
                                            animate={{ opacity: 0.8 }}
                                            transition={{
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: "reverse",
                                                duration: 1.5,
                                                delay: 0.1,
                                            }}
                                        >
                                            <Skeleton className="h-5 w-16 rounded-full" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0.5 }}
                                            animate={{ opacity: 0.8 }}
                                            transition={{
                                                repeat: Number.POSITIVE_INFINITY,
                                                repeatType: "reverse",
                                                duration: 1.5,
                                                delay: 0.2,
                                            }}
                                        >
                                            <Skeleton className="h-5 w-16 rounded-full" />
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5, delay: 0.3 }}
                                >
                                    <Skeleton className="h-4 w-24 mt-2" />
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0.8 }}
                                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5, delay: 0.4 }}
                                    >
                                        <Skeleton className="h-4 w-full" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0.8 }}
                                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5, delay: 0.5 }}
                                    >
                                        <Skeleton className="h-4 w-full" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 0.8 }}
                                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5, delay: 0.6 }}
                                    >
                                        <Skeleton className="h-4 w-3/4" />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="mt-3"
                                    initial={{ opacity: 0.5 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5, delay: 0.7 }}
                                >
                                    <Skeleton className="h-4 w-1/2 mt-3" />
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
