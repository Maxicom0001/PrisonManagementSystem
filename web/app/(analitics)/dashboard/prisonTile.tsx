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

export default function PrisonTile() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/prison"],
        queryFn: () => fetchData("api/dashboard/prison"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    console.log(data)

    if (isLoading) return prisonTileSkeleton();
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.div variants={itemVariants}>
            <Card className="h-full overflow-hidden flex flex-col p-0">
                <CardHeader className="bg-green-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-green-600">
                        <Building className="h-5 w-5" />
                        Prison
                    </CardTitle>
                    <CardDescription>Facility and infrastructure</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 px-4 flex-1">
                    <div className="space-y-4">
                        <div>
                            <span className="text-muted-foreground text-sm">Available Cells</span>
                            <div className="flex items-end gap-2">
                                <motion.span
                                    className="text-3xl font-bold"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {data.prison.availbleCells}
                                </motion.span>
                                <span className="text-muted-foreground text-sm">of {data.prison.totalSpace}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                                <motion.div
                                    className="bg-green-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: data.prison.availbleCells > 0 ? `${(data.prison.availbleCells / data.prison.totalSpace) * 100}%` : "0%" ,
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-muted-foreground text-sm">Cell Blocks</span>
                            <div className="flex items-end gap-2">
                                <motion.span
                                    className="text-3xl font-bold"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {data.prison.cellBlocks}
                                </motion.span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mt-2">
                                <motion.div
                                    className="bg-green-700 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3}}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-muted-foreground">Buildings</span>
                            <motion.div
                                className="flex gap-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {Array.from({ length: data.prison.buildings }).map((_, i) => (
                                    <div key={i} className="w-3 h-6 bg-green-200 rounded-sm first:rounded-l-md last:rounded-r-md" />
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-green-500/5 py-2 mt-auto px-4">
                    <Button variant="ghost" disabled size="sm" className="ml-auto text-green-600">
                        
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

function prisonTileSkeleton(){
    return(
        <motion.div variants={itemVariants}>
        <Card className="h-full overflow-hidden flex flex-col p-0">
          <CardHeader className="bg-green-500/5 pb-2 pt-4 px-4 m-0 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-green-200 animate-pulse"></div>
              <div className="h-6 w-24 bg-green-200 rounded-md animate-pulse"></div>
            </div>
            <div className="h-4 w-48 bg-muted rounded-md animate-pulse mt-1"></div>
          </CardHeader>
          <CardContent className="pt-4 px-4 flex-1">
            <div className="space-y-4">
              <div>
                <div className="h-4 w-28 bg-muted rounded-md animate-pulse mb-2"></div>
                <div className="flex items-end gap-2">
                  <div className="h-8 w-12 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-4 w-16 bg-muted rounded-md animate-pulse"></div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-green-500/30 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse mb-2"></div>
                <div className="flex items-end gap-2">
                  <div className="h-8 w-12 bg-muted rounded-md animate-pulse"></div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-green-700/30 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-4 w-20 bg-muted rounded-md animate-pulse"></div>
                <div className="flex gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-6 bg-green-200/40 rounded-sm first:rounded-l-md last:rounded-r-md"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0.7 }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-green-500/5 py-2 mt-auto px-4">
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse ml-auto"></div>
          </CardFooter>
        </Card>
      </motion.div>     
    )
}