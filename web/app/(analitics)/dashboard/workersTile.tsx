import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Building, Gavel, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import { useHeader } from "@/components/providers/header-title-provider";
import { useEffect } from "react";
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

export default function WorkersTile() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/workers"],
        queryFn: () => fetchData("api/dashboard/workers"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    console.log(data)

    if (isLoading) return workersTileSkeleton();
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.div variants={itemVariants}>
            <Card className="h-full overflow-hidden flex flex-col p-0">
                <CardHeader className="bg-blue-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                        <Users className="h-5 w-5" />
                        Workers
                    </CardTitle>
                    <CardDescription>Staff and employment data</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 px-4 flex-1">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Current Staff</span>
                            <motion.span
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {Math.floor(Math.random() * data.workers.total)}
                            </motion.span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Staff</span>
                            <motion.span
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {data.workers.total}
                            </motion.span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Available Jobs</span>
                            <motion.span
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                {data.workers.jobs}
                            </motion.span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-blue-500/5 py-2 mt-auto px-4">
                    <Button variant="ghost" size="sm" className="ml-auto text-blue-600">
                        Manage Staff <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function workersTileSkeleton(){
    return(
        <motion.div variants={itemVariants}>
        <Card className="h-full overflow-hidden flex flex-col p-0">
          <CardHeader className="bg-blue-500/5 pb-2 pt-4 px-4 m-0 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-200 animate-pulse"></div>
              <div className="h-6 w-24 bg-blue-200 rounded-md animate-pulse"></div>
            </div>
            <div className="h-4 w-48 bg-muted rounded-md animate-pulse mt-1"></div>
          </CardHeader>
          <CardContent className="pt-4 px-4 flex-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse"></div>
                <div className="h-7 w-12 bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse"></div>
                <div className="h-7 w-12 bg-muted rounded-md animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-28 bg-muted rounded-md animate-pulse"></div>
                <div className="h-7 w-12 bg-muted rounded-md animate-pulse"></div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-blue-500/5 py-2 mt-auto px-4">
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse ml-auto"></div>
          </CardFooter>
        </Card>
      </motion.div>
    )
}