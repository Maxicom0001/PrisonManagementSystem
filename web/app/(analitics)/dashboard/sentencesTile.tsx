import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gavel } from "lucide-react";
import fetchData from "@/components/api/fetch-data";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

export default function SentencesTile() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/sentences"],
        queryFn: () => fetchData("api/dashboard/sentences"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    console.log(data);

    if (isLoading) return sentencesTileSkeleton();
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full overflow-hidden relative flex flex-col p-0">
                <CardHeader className="bg-amber-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                        <Gavel className="h-5 w-5" />
                        Sentences
                    </CardTitle>
                    <CardDescription>Conviction and sentencing information</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 px-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <motion.div className="flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <span className="text-muted-foreground text-sm">Longest Sentence</span>
                            <span className="text-xl font-bold">{Math.floor(data.sentences.longest.time / 365.25)} years</span>
                            <span className="text-sm text-muted-foreground mt-1">{data.sentences.longest.reason.slice(0, 50)}...</span>
                            <Button variant="outline" size="sm" className="mt-2">
                                P-{data.sentences.longest.id}
                            </Button>
                        </motion.div>
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="text-muted-foreground text-sm">Shortest Sentence</span>
                            <span className="text-xl font-bold">{Math.floor(data.sentences.shortest.time / 365.25)} years</span>
                            <span className="text-sm text-muted-foreground mt-1">{data.sentences.shortest.reason.slice(0, 50)}...</span>
                            <Button variant="outline" size="sm" className="mt-2">
                                P-{data.sentences.shortest.id}
                            </Button>
                        </motion.div>
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <span className="text-muted-foreground text-sm">Newest Sentence</span>
                            <span className="text-xl font-bold">{Math.floor(data.sentences.newest.time / 365.25)} years</span>
                            <span className="text-sm text-muted-foreground mt-1">{data.sentences.newest.reason.slice(0, 50)}</span>
                            <Button variant="outline" size="sm" className="mt-2">
                                P-{data.sentences.newest.id}
                            </Button>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                            <span className="text-muted-foreground text-sm">Active</span>
                            <motion.span
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {data.sentences.totalActive}
                            </motion.span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                            <span className="text-muted-foreground text-sm">Completed</span>
                            <motion.span
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {data.sentences.completed}
                            </motion.span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-amber-500/5 py-2 mt-auto w-full px-4">
                    <Link href="/sentences" className="ml-auto">
                        <Button variant="ghost" size="sm" className="ml-auto text-amber-600">
                            View All Sentences <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function sentencesTileSkeleton() {
    return (
        <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full overflow-hidden relative flex flex-col p-0">
                <CardHeader className="bg-amber-500/5 pb-2 pt-4 px-4 m-0 rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-amber-200 animate-pulse"></div>
                        <div className="h-6 w-28 bg-amber-200 rounded-md animate-pulse"></div>
                    </div>
                    <div className="h-4 w-56 bg-muted rounded-md animate-pulse mt-1"></div>
                </CardHeader>
                <CardContent className="pt-4 px-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex flex-col">
                                <div className="h-4 w-32 bg-muted rounded-md animate-pulse mb-2"></div>
                                <div className="h-7 w-20 bg-muted rounded-md animate-pulse"></div>
                                <div className="h-4 w-28 bg-muted rounded-md animate-pulse mt-1"></div>
                                <div className="h-8 w-20 bg-muted rounded-md animate-pulse mt-2"></div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {[0, 1].map((i) => (
                            <div key={i} className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                                <div className="h-4 w-16 bg-muted rounded-md animate-pulse mb-2"></div>
                                <div className="h-7 w-16 bg-muted rounded-md animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="bg-amber-500/5 py-2 mt-auto w-full px-4">
                    <div className="h-8 w-36 bg-muted rounded-md animate-pulse ml-auto"></div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
