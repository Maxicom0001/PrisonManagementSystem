"use client";

import { useState } from "react";
import { Edit, Check, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditScheduleForm } from "./edit-schedule-form";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/components/api/fetch-data";

type ScheduleItem = {
    id: number;
    time: string;
    activity: string;
    status: "Completed" | "Upcoming";
};

const initialSchedule: ScheduleItem[] = [
    {
        id: 1,
        time: "07:00",
        activity: "Morning roll call",
        status: "Completed",
    },
    {
        id: 2,
        time: "07:30",
        activity: "Breakfast",
        status: "Completed",
    },
    {
        id: 3,
        time: "08:30",
        activity: "Work assignments",
        status: "Completed",
    },
    {
        id: 4,
        time: "12:00",
        activity: "Lunch",
        status: "Upcoming",
    },
    {
        id: 5,
        time: "13:30",
        activity: "Recreation time",
        status: "Upcoming",
    },
    {
        id: 6,
        time: "18:00",
        activity: "Dinner",
        status: "Upcoming",
    },
    {
        id: 7,
        time: "20:00",
        activity: "Evening roll call",
        status: "Upcoming",
    },
    {
        id: 8,
        time: "22:00",
        activity: "Lights out",
        status: "Upcoming",
    },
];

export default function Home() {
    const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
    const [open, setOpen] = useState(false);

    const handleEdit = (item: ScheduleItem) => {
        setSelectedItem(item);
        setOpen(true);
    };

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

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["dashboard/prisoners"],
        queryFn: () => fetchData("api/schedule"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    console.log(data);

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <main className="container mx-auto py-10">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Rozkład Zajęć Więzienia</CardTitle>
                    <CardDescription>Harmonogram dzienny dla osadzonych</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 border-b bg-muted/50 p-4 font-medium">
                            <div className="col-span-2">Czas</div>
                            <div className="col-span-6">Aktywność</div>
                            <div className="col-span-3">Status</div>
                            <div className="col-span-1">Akcje</div>
                        </div>
                        {data.map((item: ScheduleItem) => (
                            <div key={item.id} className="grid grid-cols-12 border-b p-4 last:border-0">
                                <div className="col-span-2 font-medium">{item.time}</div>
                                <div className="col-span-6">{item.activity}</div>
                                <div className="col-span-3">
                                    <div
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                            item.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {item.status === "Completed" ? <Check className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                                        {item.status}
                                    </div>
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edytuj pozycję harmonogramu</DialogTitle>
                        <DialogDescription>Zmień szczegóły aktywności w harmonogramie</DialogDescription>
                    </DialogHeader>
                    {selectedItem ? <EditScheduleForm item={selectedItem} onSave={handleSave} /> : null}
                </DialogContent>
            </Dialog>
        </main>
    );
}
