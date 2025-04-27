"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useHeader } from "@/components/providers/header-title-provider";
import fetchData from "@/components/api/fetch-data";
import { SentencesSkeleton } from "./loading-skeleton";

type Sentence = {
    id: number;
    czas_trwania: number;
    powod: string;
    id_status: number;
    id_grupy: number;
};

const statusMap: Record<number, { label: string; color: string }> = {
    1: { label: "Active", color: "bg-primary/20 text-primary" },
    2: { label: "Suspended", color: "bg-accent/20 text-accent-foreground" },
    3: { label: "Dismissed", color: "bg-muted text-muted-foreground" },
    4: { label: "Appealed", color: "bg-secondary/20 text-secondary" },
};

const groupMap: Record<number, { label: string; color: string }> = {
    1: { label: "Non-violent", color: "bg-chart-2/20 text-chart-2" },
    2: { label: "Violent", color: "bg-chart-5/20 text-chart-5" },
    5: { label: "Organized", color: "bg-chart-1/20 text-chart-1" },
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

function generateSentence(offense: Sentence): string {
    const status = statusMap[offense.id_status]?.label || "Unknown status";
    const group = groupMap[offense.id_grupy]?.label || "Unknown group";
    const duration = formatDuration(offense.czas_trwania);

    return `Convicted of ${offense.powod.toLowerCase()}, sentenced to ${duration}. Case status: ${status}. Classified as ${group} offense.`;
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

export default function SentencesPage() {
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader([{ title: "Criminal Sentences Database", href: "/sentences" }]);
    });

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["sentences"],
        queryFn: () => fetchData("api/sentences"),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <SentencesSkeleton />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container max-w-7xl mx-auto p-6">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" animate="visible">
                {data.map((offense: Sentence) => (
                    <motion.div
                        key={offense.id}
                        variants={cardVariants}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 },
                        }}
                    >
                        <Card className="overflow-hidden h-full border-border">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <motion.div variants={titleVariants}>
                                        <CardTitle className="text-xl">{offense.powod}</CardTitle>
                                    </motion.div>
                                    <div className="flex gap-2">
                                        <motion.div variants={badgeVariants}>
                                            <Badge className={statusMap[offense.id_status]?.color || "bg-gray-100"}>
                                                {statusMap[offense.id_status]?.label || "Unknown"}
                                            </Badge>
                                        </motion.div>
                                        <motion.div variants={badgeVariants}>
                                            <Badge className={groupMap[offense.id_grupy]?.color || "bg-gray-100"}>
                                                {groupMap[offense.id_grupy]?.label || "Unknown"}
                                            </Badge>
                                        </motion.div>
                                    </div>
                                </div>
                                <motion.div variants={textVariants}>
                                    <CardDescription>Case ID: {offense.id}</CardDescription>
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <motion.p className="text-foreground" variants={textVariants}>
                                    {generateSentence(offense)}
                                </motion.p>
                                <motion.div className="mt-3 text-sm text-muted-foreground" variants={durationVariants}>
                                    <span className="font-medium">Sentence duration:</span> {formatDuration(offense.czas_trwania)}
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
