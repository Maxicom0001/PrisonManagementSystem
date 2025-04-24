"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Building, Gavel, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import { useHeader } from "@/components/providers/header-title-provider";
import { useEffect } from "react";
import PrisonersTile from "./prisonersTile";
import WorkersTile from "./workersTile";
import SentencesTile from "./sentencesTile";
import ScheduleTile from "./scheduleTile";
import PrisonTile from "./prisonTile";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function Dashboard() {
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader([{ title: "Dashboard", href: "/dashboard" }]);
    }, []);

    return (
        <div className="container mx-auto max-w-7xl md:p-5 sm:p-7">
            <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h1 className="text-3xl font-bold tracking-tight">Prison Management Dashboard</h1>
                <p className="text-muted-foreground mt-2">Overview of prison statistics, inmates, and personnel</p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Prisoners Tile */}
                <PrisonersTile></PrisonersTile>

                {/* Workers Tile */}
                <WorkersTile></WorkersTile>


                {/* Prison Tile */}
                <PrisonTile></PrisonTile>

                {/* Sentences Tile */}
                <SentencesTile></SentencesTile>

                {/* Schedule Tile */}

                {/* Clock Tile */}
                <ScheduleTile></ScheduleTile>

            </motion.div>
        </div>
    );
}
