"use client";

import { useQuery } from "@tanstack/react-query";
import { ScrollingLoader } from "@/components/own/scrolling-loader";
import { motion } from "framer-motion";
import fetchData from "@/components/api/fetch-data";

export function PrisonersCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/prisoners"],
        queryFn: () => fetchData("api/dashboard/prisoners"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Prisoners: {data.prisoners.total}
        </motion.p>
    );
}

export function WorkersCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/workers"],
        queryFn: () => fetchData("api/dashboard/workers"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Workers: {data.workers.total}
        </motion.p>
    );
}

export function ActiveJobsCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/workers"],
        queryFn: () => fetchData("api/dashboard/workers"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Active Jobs: {data.workers.jobs}
        </motion.p>
    );
}
