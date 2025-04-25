"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

type ApiSentence = {
    id: number;
    czas_trwania: number;
    powod: string;
    id_status: number;
    id_grupy: number;
};

type CriminalOffense = {
    id: number;
    duration: number;
    offense: string;
    statusId: number;
    groupId: number;
};

const statusMap: Record<number, { label: string; color: string }> = {
    1: { label: "Active", color: "bg-green-100 text-green-800" },
    2: { label: "Suspended", color: "bg-yellow-100 text-yellow-800" },
    3: { label: "Dismissed", color: "bg-gray-100 text-gray-800" },
    4: { label: "Appealed", color: "bg-blue-100 text-blue-800" },
};

const groupMap: Record<number, { label: string; color: string }> = {
    1: { label: "Non-violent", color: "bg-blue-100 text-blue-800" },
    2: { label: "Violent", color: "bg-red-100 text-red-800" },
    5: { label: "Organized", color: "bg-purple-100 text-purple-800" },
};

function formatDuration(days: number): string {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const finalDays = remainingDays % 30;

    let result = "";
    if (years > 0) {
        result += `${years} year${years > 1 ? "s" : ""} `;
    }
    if (months > 0) {
        result += `${months} month${months > 1 ? "s" : ""} `;
    }
    if (finalDays > 0 || (years === 0 && months === 0)) {
        result += `${finalDays} day${finalDays !== 1 ? "s" : ""}`;
    }

    return result.trim();
}

function generateSentence(offense: CriminalOffense): string {
    const status = statusMap[offense.statusId]?.label || "Unknown status";
    const group = groupMap[offense.groupId]?.label || "Unknown group";
    const duration = formatDuration(offense.duration);

    return `Convicted of ${offense.offense.toLowerCase()}, sentenced to ${duration}. Case status: ${status}. Classified as ${group} offense.`;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const titleVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
        },
    },
};

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
        },
    },
};

const textVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.4,
        },
    },
};

const durationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.5,
        },
    },
};

async function fetchSentences(): Promise<CriminalOffense[]> {
    const response = await fetch("/api/sentences");

    if (!response.ok) {
        throw new Error("Failed to fetch sentences");
    }

    const data: ApiSentence[] = await response.json();

    return data.map((item) => ({
        id: item.id,
        duration: item.czas_trwania,
        offense: item.powod,
        statusId: item.id_status,
        groupId: item.id_grupy,
    }));
}

export default function SentencesPage() {
    const [isAnimating, setIsAnimating] = useState(false);

    const {
        data: criminalOffenses,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["sentences"],
        queryFn: fetchSentences,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (criminalOffenses && !isLoading) {
            setIsAnimating(true);
        }
    }, [criminalOffenses, isLoading]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Criminal Sentences Database</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Criminal Sentences Database</h1>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{(error as Error).message || "Failed to load sentences"}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container max-w-7xl mx-auto p-6">
            <motion.h1
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                }}
            >
                Criminal Sentences Database
            </motion.h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isAnimating ? "visible" : "hidden"}
            >
                {criminalOffenses?.map((offense) => (
                    <motion.div
                        key={offense.id}
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Card className="overflow-hidden h-full">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <motion.div variants={titleVariants}>
                                        <CardTitle className="text-xl">{offense.offense}</CardTitle>
                                    </motion.div>
                                    <div className="flex gap-2">
                                        <motion.div variants={badgeVariants}>
                                            <Badge className={statusMap[offense.statusId]?.color || "bg-gray-100"}>
                                                {statusMap[offense.statusId]?.label || "Unknown"}
                                            </Badge>
                                        </motion.div>
                                        <motion.div variants={badgeVariants}>
                                            <Badge className={groupMap[offense.groupId]?.color || "bg-gray-100"}>
                                                {groupMap[offense.groupId]?.label || "Unknown"}
                                            </Badge>
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.div variants={textVariants}>
                                    <CardDescription>Case ID: {offense.id}</CardDescription>
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <motion.p className="text-gray-700" variants={textVariants}>
                                    {generateSentence(offense)}
                                </motion.p>
                                <motion.div className="mt-3 text-sm text-gray-500" variants={durationVariants}>
                                    <span className="font-medium">Sentence duration:</span> {formatDuration(offense.duration)}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
