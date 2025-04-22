import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Building, Gavel, ArrowRight, Calendar, AlertCircle } from "lucide-react";
import { useHeader } from "@/components/providers/header-title-provider";
import { useEffect } from "react";
import fetchData from "@/components/own/fetch-data";
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

const badgeVariant = (time: string) => {
    const currentTime = new Date().getUTCHours();

    const scheduleTime = new Date(`1970-01-01T${time}Z`).getUTCHours(); // Convert to UTC hours

    console.log(scheduleTime)

    if (scheduleTime > currentTime) {
        return "Upcoming";
    }else if (scheduleTime < currentTime && scheduleTime > currentTime - 1) {
        return "In progress";
    }
    return "Completed";
}

interface ScheduleItem {
    time: string;
    title: string;
}

export default function ScheduleTile() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/schedule"],
        queryFn: () => fetchData("api/dashboard/schedule"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    console.log(data)

    if (isLoading) return scheduleTileSkeleton();
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-purple-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Clock className="h-5 w-5" />
                    Schedule
                </CardTitle>
                <CardDescription>Today's prison schedule</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
                <div className="space-y-4">
                    {data.schedule.map((item: ScheduleItem, index: number) => (
                        <motion.div
                            key={index}
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-medium w-12">{new Date(`1970-01-01T${item.time}Z`).getUTCHours() < 10 ? "0" : ""}
                                                                          {new Date(`1970-01-01T${item.time}Z`).getUTCHours()}:
                                                                          {new Date(`1970-01-01T${item.time}Z`).getUTCMinutes() < 10 ? "0" : ""}
                                                                          {new Date(`1970-01-01T${item.time}Z`).getUTCMinutes()}</div>
                                <div className="text-sm">{item.title}</div>
                            </div>
                            <Badge
                                variant={badgeVariant(item.time) === "Completed" ? "outline" : badgeVariant(item.time) === "In progress" ? "secondary" : "default"}
                                className={
                                    badgeVariant(item.time) === "Completed"
                                        ? "text-muted-foreground"
                                        : badgeVariant(item.time) === "In progress"
                                          ? "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
                                          : ""
                                }
                            >
                                {badgeVariant(item.time)}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="bg-purple-500/5 py-2 mt-auto px-4">
                <Button variant="ghost" size="sm" className="ml-auto text-purple-600">
                    Full Schedule <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
    );
}

function scheduleTileSkeleton(){
    return(
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-purple-500/5 pb-2 pt-4 px-4 m-0 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-purple-200 animate-pulse"></div>
                <div className="h-6 w-24 bg-purple-200 rounded-md animate-pulse"></div>
              </div>
              <div className="h-4 w-48 bg-muted rounded-md animate-pulse mt-1"></div>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-12 bg-muted rounded-md animate-pulse"></div>
                      <div className="h-4 w-28 bg-muted rounded-md animate-pulse"></div>
                    </div>
                    <div className="h-6 w-20 bg-muted rounded-md animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-purple-500/5 py-2 mt-auto px-4">
              <div className="h-8 w-32 bg-muted rounded-md animate-pulse ml-auto"></div>
            </CardFooter>
          </Card>
        </motion.div>
    )
}