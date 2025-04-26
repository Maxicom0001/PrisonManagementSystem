"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

type ScheduleItem = {
    id: number;
    title: string;
    time: string;
};

interface EditScheduleFormProps {
    item?: ScheduleItem;
    onSave: (updatedItem: ScheduleItem) => void;
    onDelete: (id: number) => void;
}

export function EditScheduleForm({ item, onSave, onDelete }: EditScheduleFormProps) {
    // Check if item exists, if not use a default empty item
    const defaultItem: ScheduleItem = item || {
        id: 0,
        time: "",
        title: "",
    };

    const form = useForm<ScheduleItem>({
        defaultValues: {
            id: defaultItem.id,
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
                <div className="flex justify-end space-x-2">
                    <Button variant={"destructive"} onClick={() => onDelete(item?.id || 0)}>
                        Delete
                    </Button>
                    <Button type="submit">Save changes</Button>
                </div>
            </form>
        </Form>
    );
}
