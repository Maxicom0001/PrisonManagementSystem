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
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Error: {error.message}</div>;

    const handleEdit = (item: ScheduleItem) => {
        setSelectedItem(item);
        setOpenEdit(true);
    };

    const handleAdd = () => {
        setOpenAdd(true);
    }

    const handleSave = (updatedItem: ScheduleItem) => {
        // Ensure the status is properly typed
        const validStatus: "Completed" | "Upcoming" = updatedItem.status === "Completed" ? "Completed" : "Upcoming";

        // Create a properly typed updated item
        const typedItem: ScheduleItem = {
            ...updatedItem,
            status: validStatus,
        };

        setOpen(false);
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

    return (
        <main className="container mx-auto py-10">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Prison Schedule</CardTitle>
                    <CardDescription>
                        <div className="flex flex-row justify-between items-stretch">
                            Daily schedule for inmates
                            <div className="col-span-1">
                                <Button onClick={handleAdd} asChild>
                                    <div>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Add Event
                                        <span className="sr-only">Edit</span>
                                    </div>
                                </Button>
                             </div>
                        </div>

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                            <div className="col-span-2">Time</div>
                            <div className="col-span-6">Activity</div>
                            <div className="col-span-3">Status</div>
                            <div className="col-span-1">Actions</div>
                        </div>
                        {data?.map((item: ScheduleItem) => (
                            <div key={item.id} className="grid grid-cols-12 border-b p-4 last:border-0">
                                <div className="col-span-2 font-medium">{item.time}</div>
                                <div className="col-span-6">{item.title}</div>
                                <div className="col-span-3">
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
                                </div>
                                <div className="col-span-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edytuj</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit schedule entry</DialogTitle>
                        <DialogDescription>Change activity details in the schedule</DialogDescription>
                    </DialogHeader>
                    {selectedItem ? <EditScheduleForm item={selectedItem} onSave={() => handleSave} /> : null}
                </DialogContent>
            </Dialog>

            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new schedule entry</DialogTitle>
                        <DialogDescription>Add activity for prison</DialogDescription>
                    </DialogHeader>
                    <AddScheduleForm/>
                </DialogContent>
            </Dialog>
        </main>
    );
}
