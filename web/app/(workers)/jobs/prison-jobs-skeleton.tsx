"use client";

import { FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

// Wrap shadcn components with motion
const MotionCard = motion(Card);
const MotionDiv = motion.div;

export function PrisonJobsSkeleton() {
    // Animation variants for pulse effect
    const pulseVariants = {
        initial: { opacity: 0.6 },
        animate: {
            opacity: 1,
            transition: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse" as const,
                duration: 1.5,
            },
        },
    };

    return (
        <div className="flex items-center justify-center p-4 max-w-7xl w-full h-full">
            <MotionCard className="w-full max-w-5xl shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <CardHeader className="border-b pb-2 pt-3">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        <CardTitle className="text-xl font-bold">
                            <Skeleton className="h-6 w-40" />
                        </CardTitle>
                    </div>
                    <CardDescription>
                        <Skeleton className="h-3 w-64 mt-1" />
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-3 pb-2">
                    <div className="flex justify-between mb-3">
                        <div className="grid grid-cols-3 gap-3 w-full">
                            {[1, 2, 3].map((i) => (
                                <MotionDiv
                                    key={i}
                                    className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center"
                                    initial="initial"
                                    animate="animate"
                                    variants={pulseVariants}
                                >
                                    <Skeleton className="h-3 w-20 mx-auto mb-1" />
                                    <Skeleton className="h-6 w-6 mx-auto" />
                                </MotionDiv>
                            ))}
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="mb-2 bg-gray-100 dark:bg-gray-800">
                                <TableHead className="w-[70%] font-bold text-sm py-2 pl-25">
                                    <Skeleton className="h-4 w-16" />
                                </TableHead>
                                <TableHead className="text-center font-bold text-sm py-2">
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array(7)
                                .fill(0)
                                .map((_, index) => (
                                    <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50 " : ""}>
                                        <TableCell className="py-2 pl-17">
                                            <Skeleton className="h-4 w-32" />
                                        </TableCell>
                                        <TableCell className="text-center py-2">
                                            <Skeleton className="h-4 w-20 mx-auto" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="border-t flex justify-between text-xs text-gray-500 pt-2 pb-2">
                    <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-3 w-40" />
                </CardFooter>
            </MotionCard>
        </div>
    );
}
