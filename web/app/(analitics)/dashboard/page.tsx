"use client";

import { motion } from "framer-motion";
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
