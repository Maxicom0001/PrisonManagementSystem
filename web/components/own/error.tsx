"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface ErrorWithMessageProps {
    errorMessage?: string;
}

export default function ErrorWithMessage({ errorMessage = "An unknown error occurred" }: ErrorWithMessageProps) {
    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="flex items-center justify-center pt-6 pb-2">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <AlertTriangle className="h-16 w-16 text-amber-500" />
                </motion.div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    <h2 className="text-2xl font-bold">We are sorry for the inconvenience</h2>
                </motion.div>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="p-4 bg-muted rounded-md"
                >
                    <p className="text-muted-foreground break-words">{errorMessage}</p>
                </motion.div>
            </CardContent>
            <CardFooter className="justify-center pb-6">
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button asChild>
                        <Link href="/contact-support" className="flex items-center gap-2">
                            Contact Support
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </Button>
                </motion.div>
            </CardFooter>
        </Card>
    );
}
