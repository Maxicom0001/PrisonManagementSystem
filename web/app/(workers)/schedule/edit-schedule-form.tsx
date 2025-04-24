"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

type ScheduleItem = {
    id: number;
    time: string;
    activity: string;
    status: "Completed" | "Upcoming";
};

interface EditScheduleFormProps {
    item?: ScheduleItem;
    onSave: (updatedItem: ScheduleItem) => void;
}

export function EditScheduleForm({ item, onSave }: EditScheduleFormProps) {
    // Check if item exists, if not use a default empty item
    const defaultItem: ScheduleItem = item || {
        id: 0,
        time: "",
        activity: "",
        status: "Upcoming",
    };

    const form = useForm<ScheduleItem>({
        defaultValues: {
            id: defaultItem.id,
            time: defaultItem.time,
            activity: defaultItem.activity,
            status: defaultItem.status,
        },
    });

    const handleSubmit = (data: ScheduleItem) => {
        // Ensure status is properly typed
        const validStatus: "Completed" | "Upcoming" = data.status === "Completed" ? "Completed" : "Upcoming";

        // Create a properly typed object
        const updatedItem: ScheduleItem = {
            ...data,
            status: validStatus,
        };

        onSave(updatedItem);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Czas</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="np. 07:00" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="activity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Aktywność</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Nazwa aktywności" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={(value: "Completed" | "Upcoming") => field.onChange(value)} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Wybierz status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit">Zapisz zmiany</Button>
                </div>
            </form>
        </Form>
    );
}
