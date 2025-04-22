"use client"

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import fetchData from "@/components/api/fetch-data";
import { useQuery } from "@tanstack/react-query";

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

export default function PrisonersTile() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/prisoners"],
        queryFn: () => fetchData("api/dashboard/prisoners"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    console.log(data)

    if (isLoading) return prisonersTileSkeleton();
    if (isError) return <div>Error: {error.message}</div>;

    return (
            <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full overflow-hidden flex flex-col p-0">
                <CardHeader className="bg-red-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-red-600">
                    <Users className="h-5 w-5" />
                    Prisoners
                </CardTitle>
                <CardDescription>Inmate statistics and information</CardDescription>
                </CardHeader>

                <CardContent className="pt-4 px-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Total Inmates */}
                    <div className="flex flex-col p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <span className="text-muted-foreground text-sm">Total Inmates</span>
                    <motion.span
                        className="text-3xl font-bold"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {data.prisoners.total}
                    </motion.span>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>
                        Facility at{' '}
                        {Math.round(
                            (data.prisoners.total / Number(data.prisoners.totalCells)) *
                            100
                        )}
                        % capacity
                        </span>
                    </div>
                    </div>

                    {/* Longest Stay */}
                    <div className="flex flex-col p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <span className="text-muted-foreground text-sm">Longest Stay</span>
                    <span className="font-medium">
                        {data.prisoners.oldest.imie}{' '}
                        {data.prisoners.oldest.nazwisko}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                        <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        >
                        {new Date().getFullYear() -
                            new Date(
                            data.prisoners.oldest.data_osadzenia
                            ).getFullYear()}{' '}
                        years
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                        Since{' '}
                        {new Date(
                            data.prisoners.oldest.data_osadzenia
                        ).getFullYear()}
                        </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                        P-{data.prisoners.oldest.id}
                    </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Newest Prisoner */}
                    <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                        Newest Prisoner
                    </span>
                    <span className="font-medium">
                        {data.prisoners.newest.imie}{' '}
                        {data.prisoners.newest.nazwisko}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">
                        {new Date(
                            data.prisoners.newest.data_osadzenia
                        ).toLocaleDateString()}
                        </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                        P-{data.prisoners.newest.id}
                    </Button>
                    </div>

                    {/* Next Release */}
                    <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                        Next Release
                    </span>
                    <span className="font-medium">
                        {data.prisoners.nextRelease.imie}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs text-muted-foreground">
                        {new Date(
                            data.prisoners.nextRelease.new_date
                        ).toLocaleDateString()}
                        </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                        P-{data.prisoners.nextRelease.id}
                    </Button>
                    </div>
                </div>
                </CardContent>

                <CardFooter className="bg-red-500/5 py-2 mt-auto w-full px-4">
                <Button variant="ghost" size="sm" className="ml-auto text-red-600">
                    View All Prisoners <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                </CardFooter>
            </Card>
            </motion.div>

    );
}

function prisonersTileSkeleton () {
    return (
        <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-red-500/5 pb-2 pt-4 px-4 m-0 rounded-t-lg">
            <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-200 animate-pulse"></div>
                <div className="h-6 w-24 bg-red-200 rounded-md animate-pulse"></div>
            </div>
            <div className="h-4 w-48 bg-muted rounded-md animate-pulse mt-1"></div>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col p-3 bg-red-50 dark:bg-red-950/20 rounded-lg h-28">
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse mb-2"></div>
                <div className="h-8 w-16 bg-muted rounded-md animate-pulse"></div>
                <div className="mt-2 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-muted animate-pulse mr-1"></div>
                    <div className="h-3 w-32 bg-muted rounded-md animate-pulse"></div>
                </div>
                </div>

                <div className="flex flex-col p-3 bg-red-50 dark:bg-red-950/20 rounded-lg h-28">
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse mb-2"></div>
                <div className="h-5 w-32 bg-muted rounded-md animate-pulse"></div>
                <div className="flex items-center gap-1 mt-1">
                    <div className="h-5 w-16 bg-red-100 rounded-md animate-pulse"></div>
                    <div className="h-3 w-20 bg-muted rounded-md animate-pulse"></div>
                </div>
                <div className="h-8 w-20 bg-muted rounded-md animate-pulse mt-2"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                <div className="h-4 w-28 bg-muted rounded-md animate-pulse mb-2"></div>
                <div className="h-5 w-32 bg-muted rounded-md animate-pulse"></div>
                <div className="flex items-center gap-1 mt-1">
                    <div className="h-3 w-3 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-3 w-24 bg-muted rounded-md animate-pulse"></div>
                </div>
                <div className="h-8 w-20 bg-muted rounded-md animate-pulse mt-2"></div>
                </div>
                <div className="flex flex-col">
                <div className="h-4 w-28 bg-muted rounded-md animate-pulse mb-2"></div>
                <div className="h-5 w-32 bg-muted rounded-md animate-pulse"></div>
                <div className="flex items-center gap-1 mt-1">
                    <div className="h-3 w-3 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-3 w-24 bg-muted rounded-md animate-pulse"></div>
                </div>
                <div className="h-8 w-20 bg-muted rounded-md animate-pulse mt-2"></div>
                </div>
            </div>
            </CardContent>
            <CardFooter className="bg-red-500/5 py-2 mt-auto w-full px-4">
            <div className="h-8 w-36 bg-muted rounded-md animate-pulse ml-auto"></div>
            </CardFooter>
        </Card>
        </motion.div>
    )
}