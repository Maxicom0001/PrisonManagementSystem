"use client";

import { useQuery } from "@tanstack/react-query";
import { ScrollingLoader } from "@/components/own/scrolling-loader";
import { motion } from "framer-motion";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async () => {
    await delay(2000); // Simulate network delay
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
};

export function PrisonersCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["data"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Prisoners: {data.userId}
        </motion.p>
    );
}

export function WorkersCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["data"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Workers: {data.userId}
        </motion.p>
    );
}

export function ActiveJobsCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["data"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Active Jobs: {data.userId}
        </motion.p>
    );
}

export function LastUpdateCounter() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["data"],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <ScrollingLoader indicatorColor="bg-gray-200"></ScrollingLoader>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Last update: {data.userId}
        </motion.p>
    );
}
