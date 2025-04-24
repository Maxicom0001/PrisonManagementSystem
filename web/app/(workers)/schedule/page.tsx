"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditScheduleForm } from "./edit-schedule-form";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/components/api/fetch-data";
import { Badge } from "@/components/ui/badge";
import { AddScheduleForm } from "./add-schedule-form";
import { useHeader } from "@/components/providers/header-title-provider";
import { motion, AnimatePresence  } from "framer-motion";

type ScheduleItem = {
    id: number;
    title: string;
    time: string;
};

export default function Home() {
    const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    const { setHeader } = useHeader();
    useEffect(() => {
        setHeader([{ title: "Schedule", href: "/schedule" }]);
    }, [])


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["schedule"],
        queryFn: () => fetchData("api/schedule"),
        refetchOnWindowFocus: false,
        retry: false,
    });
    if (isLoading) return <LoadingSchedule />;
    if (isError) return <div>Error: {error.message}</div>;

    const handleEdit = (item: ScheduleItem) => {
        setSelectedItem(item);
        setOpenEdit(true);
    };

    const handleAdd = () => {
        setOpenAdd(true);
    }

    const handleSave = (updatedItem: ScheduleItem) => {
        // Create a properly typed updated item
        const typedItem: ScheduleItem = {
            ...updatedItem,
        };

        setOpenAdd(false);
    };

    const badgeVariant = (time: string) => {
        const currentTime = new Date().getHours();
    
        const scheduleTime = new Date(`1970-01-01T${time}Z`).getHours() - 1; // Convert to UTC hours
    
        if (scheduleTime == currentTime) {
            return "In progress";
        }else if (scheduleTime > currentTime) {
            return "Upcoming";
        }
        return "Completed";
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    }

    return (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-10"
        >
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-4xl mx-auto bg-neutral border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl">Prison Schedule</CardTitle>
                <CardDescription>
                  <div className="flex flex-row justify-between items-stretch">
                    Daily schedule for inmates
                    <div className="col-span-1">
                      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button onClick={handleAdd} asChild>
                          <div>
                            <Edit className="h-4 w-4 mr-2" />
                            Add Event
                            <span className="sr-only">Edit</span>
                          </div>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-[var(--color-card)] shadow-lg">
                  <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                    <div className="col-span-2">Time</div>
                    <div className="col-span-6">Activity</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                  <motion.div variants={containerVariants} initial="hidden" animate="show">
                    {data?.map((item: ScheduleItem) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="grid grid-cols-12 border-b p-4 last:border-0"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      >
                        <div className="col-span-2 font-medium">{item.time}</div>
                        <div className="col-span-6">{item.title}</div>
                        <div className="col-span-3">
                          <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Badge
                              variant={
                                badgeVariant(item.time) === "Completed"
                                  ? "outline"
                                  : badgeVariant(item.time) === "In progress"
                                    ? "secondary"
                                    : "default"
                              }
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
                        </div>
                        <div className="col-span-1">
                          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
    
          <AnimatePresence>
            {openEdit && (
              <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit schedule entry</DialogTitle>
                    <DialogDescription>Change activity details in the schedule</DialogDescription>
                  </DialogHeader>
                  {selectedItem ? <EditScheduleForm item={selectedItem} onSave={handleSave} /> : null}
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>
    
          <AnimatePresence>
            {openAdd && (
              <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new schedule entry</DialogTitle>
                    <DialogDescription>Add activity for prison</DialogDescription>
                  </DialogHeader>
                  <AddScheduleForm />
                </DialogContent>
              </Dialog>
            )}
          </AnimatePresence>
        </motion.main>
      )
}


export function LoadingSchedule() {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // Create 5 skeleton items
  const skeletonItems = Array.from({ length: 5 }).map((_, i) => (
    <motion.div key={i} variants={itemVariants} className="grid grid-cols-12 border-b p-4 last:border-0">
      <div className="col-span-2 font-medium">
        <div className="h-6 bg-muted animate-pulse rounded w-16"></div>
      </div>
      <div className="col-span-6">
        <div className="h-6 bg-muted animate-pulse rounded w-full max-w-[250px]"></div>
      </div>
      <div className="col-span-3">
        <div className="h-6 bg-muted animate-pulse rounded w-24"></div>
      </div>
      <div className="col-span-1">
        <div className="h-6 bg-muted animate-pulse rounded w-6"></div>
      </div>
    </motion.div>
  ))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto border-0 shadow-none bg-neutral">
        <CardHeader>
          <CardTitle className="text-2xl">
            <div className="h-8 bg-muted animate-pulse rounded w-48"></div>
          </CardTitle>
          <CardDescription>
            <div className="flex flex-row justify-between items-stretch">
              <div className="h-6 bg-muted animate-pulse rounded w-40"></div>
              <div className="h-10 bg-muted animate-pulse rounded w-32"></div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-[var(--color-card)] shadow-lg">
            <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-2">Time</div>
              <div className="col-span-6">Activity</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              {skeletonItems}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}