"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

type ScheduleItem = {
    title: string;
    time: string;
};

interface EditScheduleFormProps {
    item?: ScheduleItem;
    onSave: (updatedItem: ScheduleItem) => void;
}

export function AddScheduleForm() {
    // Check if item exists, if not use a default empty item
    const defaultItem: ScheduleItem = {
        time: "",
        title: "",
    };

    const form = useForm<ScheduleItem>({
        defaultValues: {
            time: defaultItem.time,
            title: defaultItem.title,
        },
    });

    const handleSubmit = (data: ScheduleItem) => {
        // Create a properly typed object
        const updatedItem: ScheduleItem = {
            ...data,
        };

        onSave(updatedItem);
    };

    const onSave = (updatedItem: ScheduleItem) => {
        // Handle the save logic here, e.g., send to API or update state
        console.log("Saved item:", updatedItem);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                                <Input
                                    type="time"
                                    {...field}
                                    step="1" // pozwala na sekundy (HH:MM:SS), usuń, jeśli chcesz tylko HH:MM
                                    placeholder="Wybierz godzinę"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Activity</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Name of the activity" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </Form>
    );
}
