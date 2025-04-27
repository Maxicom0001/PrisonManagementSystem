"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import fetchData from "@/components/api/fetch-data";
import { useQuery } from "@tanstack/react-query";

// Funkcje do obsługi notatek
const handleAddNote = (prisonerId: number) => {
    console.log(`Dodawanie nowej notatki dla więźnia o ID: ${prisonerId}`);
    // Tutaj można dodać logikę dodawania notatki
    const today = format(new Date(), "dd.MM.yyyy");
    const newNote = `${today} - Nowa notatka`;

    // setPrisoners(
    //   prisoners.map((prisoner) => {
    //     if (prisoner.id === prisonerId) {
    //       return {
    //         ...prisoner,
    //         notatki: [newNote, ...prisoner.notatki],
    //       }
    //     }
    //     return prisoner
    //   }),
    // )
};

const handleEditNote = (prisonerId: number, noteIndex: number) => {
    console.log(`Edytowanie notatki ${noteIndex} dla więźnia o ID: ${prisonerId}`);
    // Tutaj można dodać logikę edycji notatki
};

const handleDeleteNote = (prisonerId: number, noteIndex: number) => {
    console.log(`Usuwanie notatki ${noteIndex} dla więźnia o ID: ${prisonerId}`);

    // setPrisoners(
    //   prisoners.map((prisoner) => {
    //     if (prisoner.id === prisonerId) {
    //       const updatedNotes = [...prisoner.notatki]
    //       updatedNotes.splice(noteIndex, 1)
    //       return {
    //         ...prisoner,
    //         notatki: updatedNotes,
    //       }
    //     }
    //     return prisoner
    //   }),
    // )
};

export default function Notes({ prisoner }: { prisoner: { id: number } }) {
    console.log(prisoner.id);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["convicts/notes/" + prisoner.id],
        queryFn: () => fetchData("api/convicts/notes/" + prisoner.id),
        refetchOnWindowFocus: false,
        retry: false,
    });

    interface Note {
        id: number;
        content: string;
        created_at: string;
    }

    console.log(data);

    if (isLoading) return <NotesLoadingPlaceholder />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="md:col-span-1">
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Notes</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleAddNote(prisoner.id)}>
                                        <Plus className="h-4 w-4" />
                                        <span className="sr-only">Add Note</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add new note</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[200px] px-4 py-2">
                        <ul className="space-y-2">
                            {data.map((note: Note) => (
                                <li key={note.id} className="text-sm border-b pb-2 last:border-0">
                                    <div className="flex items-start justify-between group">
                                        <span className="flex-1 whitespace-normal w-60">
                                            {new Date(note.created_at).getFullYear()}.
                                            {new Date(note.created_at).getMonth() < 10
                                                ? "0" + new Date(note.created_at).getMonth()
                                                : new Date(note.created_at).getMonth()}
                                            .
                                            {new Date(note.created_at).getDay() < 10
                                                ? "0" + new Date(note.created_at).getDay()
                                                : new Date(note.created_at).getDay()}
                                            {" - "}
                                            {note.content}
                                        </span>
                                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => handleEditNote(prisoner.id, note.id)}
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                            <span className="sr-only">Edit Note</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Edit Note</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-destructive hover:text-destructive"
                                                            onClick={() => handleDeleteNote(prisoner.id, note.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            <span className="sr-only">Delete Note</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Delete Note</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

export function NotesLoadingPlaceholder() {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Notatki</CardTitle>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6" disabled>
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Dodaj notatkę</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Dodaj nową notatkę</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[200px] px-4 py-2">
                    <ul className="space-y-2">
                        {Array(1)
                            .fill(0)
                            .map((_, index) => (
                                <li key={index} className="text-sm border-b pb-2 last:border-0">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 space-y-1">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                        <div className="flex space-x-1 ml-2">
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
