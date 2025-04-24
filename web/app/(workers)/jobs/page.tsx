"use client";

import { Check, X, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PrisonJobsSkeleton } from "./prison-jobs-skeleton";

// Wrap shadcn components with motion
const MotionCard = motion(Card);
const MotionTableRow = motion(TableRow);
const MotionDiv = motion.div;

export default function PrisonJobs() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Show skeleton while loading
    if (isLoading) {
        return <PrisonJobsSkeleton />;
    }

    const jobs = [
        { nazwa: "Kitchen Staff", aktywne: 1 },
        { nazwa: "Laundry Worker", aktywne: 1 },
        { nazwa: "Cleaning Crew", aktywne: 1 },
        { nazwa: "Library Assistant", aktywne: 1 },
        { nazwa: "Workshop Laborer", aktywne: 1 },
        { nazwa: "Gardener", aktywne: 0 },
        { nazwa: "Maintenance", aktywne: 1 },
    ];

    // Calculate statistics
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((job) => job.aktywne === 1).length;
    const inactiveJobs = totalJobs - activeJobs;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    };

    const statsVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
    };

    return (
        <div className="flex items-center justify-center p-4 max-w-7xl w-full h-full">
            <MotionCard className="w-full max-w-5xl shadow-lg" initial="hidden" animate="visible" variants={containerVariants}>
                <CardHeader className="border-b pb-2 pt-3">
                    <motion.div className="flex items-center gap-2" variants={itemVariants}>
                        <FileText className="h-5 w-5 text-gray-500" />
                        <CardTitle className="text-xl font-bold">Prison Jobs</CardTitle>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <CardDescription className="text-sm">List of available job positions for inmates</CardDescription>
                    </motion.div>
                </CardHeader>
                <CardContent className="pt-3 pb-2">
                    <div className="flex justify-between mb-3">
                        <motion.div className="grid grid-cols-3 gap-3 w-full" variants={itemVariants}>
                            <MotionDiv
                                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center"
                                variants={statsVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-xs text-gray-500 dark:text-gray-400">All Positions</p>
                                <p className="text-lg font-bold">{totalJobs}</p>
                            </MotionDiv>
                            <MotionDiv
                                className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-center"
                                variants={statsVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-xs text-green-600 dark:text-green-400">Active</p>
                                <p className="text-lg font-bold text-green-600 dark:text-green-400">{activeJobs}</p>
                            </MotionDiv>
                            <MotionDiv
                                className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-center"
                                variants={statsVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="text-xs text-red-600 dark:text-red-400">Inactive</p>
                                <p className="text-lg font-bold text-red-600 dark:text-red-400">{inactiveJobs}</p>
                            </MotionDiv>
                        </motion.div>
                    </div>

                    <Table>
                        <TableHeader>
                            <MotionTableRow className="mb-2 bg-gray-100 dark:bg-gray-800" variants={itemVariants}>
                                <TableHead className="w-[70%] font-bold text-sm py-2 pl-25">Name</TableHead>
                                <TableHead className="text-center font-bold text-sm py-2">Status</TableHead>
                            </MotionTableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job, index) => (
                                <MotionTableRow
                                    key={job.nazwa}
                                    className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/50" : ""}
                                    variants={itemVariants}
                                    whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                                >
                                    <TableCell className="font-medium py-2 text-sm pl-17">{job.nazwa}</TableCell>
                                    <TableCell className="text-center py-2">
                                        {job.aktywne === 1 ? (
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 text-xs"
                                                >
                                                    <Check className="h-3 w-3 mr-1" /> Active
                                                </Badge>
                                            </motion.div>
                                        ) : (
                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800 text-xs"
                                                >
                                                    <X className="h-3 w-3 mr-1" /> Inactive
                                                </Badge>
                                            </motion.div>
                                        )}
                                    </TableCell>
                                </MotionTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="border-t flex justify-between text-xs text-gray-500 pt-2 pb-2">
                    <motion.div className="flex items-center gap-1" variants={itemVariants}>
                        <AlertCircle className="h-3 w-3" />
                        <span>Last update: {new Date().toLocaleDateString()}</span>
                    </motion.div>
                    <motion.div variants={itemVariants}>Prison Jobs Management System</motion.div>
                </CardFooter>
            </MotionCard>
        </div>
    );
}
