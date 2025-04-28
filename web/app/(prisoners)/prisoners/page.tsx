"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, ChevronDown, ChevronUp, Clock, Edit, Search, Trash2, UserPlus } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useHeader } from "@/components/providers/header-title-provider";
import fetchData from "@/components/api/fetch-data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import deleteData from "@/components/api/delete-data";
import { toast, ToastT } from "sonner";
import { useRouter } from "next/navigation";

// Typy danych
interface Prisoner {
    id: number;
    imie: string;
    nazwisko: string;
    drugieImie?: string;
    nazwisko_panienskie_matki?: string;
    pesel: string;
    miejsce_urodzenia: string;
    data_osadzenia: string;
    wyrok: number;
    powod_wyroku: string;
    id_celi: string;
    data_wyjscia: string | null;
    id_wyroku: number;
}

interface Note {
    id: number;
    content: string;
}

const notes: Note[] = [
    { id: 1, content: "Notatka 1" },
    { id: 2, content: "Notatka 2" },
];

// Funkcja do obliczania pozostałych dni
const calculateRemainingDays = (incarceration: string, sentenceDays: number): number => {
    const incarcerationDate = new Date(incarceration);
    const releaseDate = addDays(incarcerationDate, sentenceDays);
    const today = new Date();

    return Math.max(0, differenceInDays(releaseDate, today));
};

// Funkcja pomocnicza do dodawania dni
const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export default function PrisonerDatabase() {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { setHeader } = useHeader();
    const [url, setUrl] = useState("api/convicts?order=id&type=asc");
    const router = useRouter();
    const queryClient = useQueryClient();

    useEffect(() => {
        setHeader([{ title: "Prisoners Management", href: "/prisoners" }]);
    }, []);

    const { data, isLoading, isError, error, refetch } = useQuery<Prisoner[]>({
        queryKey: ["prisoners"],
        queryFn: () => fetchData(url),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: false,
    });

    useEffect(() => {
        refetch();
    }, [url, refetch]); // Za każdym razem, gdy url się zmieni, wywołamy refetch

    // Filtrowanie więźniów na podstawie wyszukiwania
    const filteredPrisoners = data?.filter((prisoner) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            prisoner.id.toString().includes(searchTerm) ||
            prisoner.imie.toLowerCase().includes(searchLower) ||
            prisoner.nazwisko.toLowerCase().includes(searchLower) ||
            prisoner.data_osadzenia.includes(searchTerm) ||
            prisoner.id_celi.toString().toLowerCase().includes(searchLower)
        );
    });

    // Funkcja do formatowania daty
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd MMMM yyyy", { locale: enGB });
        } catch (error) {
            return dateString;
        }
    };

    // Funkcja do obsługi edycji
    const handleEdit = (prisoner: Prisoner) => {
        console.log(`Edytowanie więźnia o ID: ${prisoner.id}`);
        router.push("/prisoners/edit/?id=" + prisoner.id + "&firstName=" + prisoner.imie + "&lastName=" + prisoner.nazwisko + "&middleName=" + prisoner.drugieImie + "&mothersMaidenName=" + prisoner.nazwisko_panienskie_matki + "&pesel=" + prisoner.pesel + "&birthplace=" + prisoner.miejsce_urodzenia + "&incarcerationDate=" + prisoner.data_osadzenia + "&sentenceId=" + prisoner.id_wyroku + "&cellId=" + prisoner.id_celi);
    };

    // Funkcja do obsługi usuwania
    const handleDelete = async (id: number) => {
        deleteData("api/convicts/" + id, {});
        setExpandedId(null);
        toast.success("Prisoner deleted successfully", {
            description: "The prisoner has been successfully deleted from the database.",
        });
      
        await queryClient.invalidateQueries({queryKey: ["prisoners"]});
        await queryClient.invalidateQueries({queryKey: ["dashboard/prisoners"]});
        await queryClient.refetchQueries({queryKey: ["prisoners"], exact: true, type: "active"});
        await refetch();
    };

    // Data in selected order is selected from database, and becasue of that we need to change the url
    const handleOrderChange = (column: string) => {
        const newUrl = "api/convicts?order=" + column + "&type=" + (url.includes("asc") ? "desc" : "asc");
        setUrl(newUrl);
    };

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col max-w-7xl w-full h-full p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search for prisoner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                    />
                </div>
                <Button disabled={isLoading} asChild>
                    <Link href="/prisoners/add">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add prisoner
                    </Link>
                </Button>
            </div>

            {isLoading ? (
                <TableLoadingPlaceholder />
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                        className="rounded-md border bg-background shadow flex overflow-auto"
                    >
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[var(--color-muted)]/50">
                                    <TableHead className="w-[80px] cursor-pointer p-4">
                                        <div className="flex items-center">
                                            ID
                                            <ArrowUpDown className="ml-1 h-4 w-4" onClick={() => handleOrderChange("id")} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer">
                                        <div className="flex items-center">
                                            Name
                                            <ArrowUpDown className="ml-1 h-4 w-4" onClick={() => handleOrderChange("imie")} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer">
                                        <div className="flex items-center">
                                            Last Name
                                            <ArrowUpDown className="ml-1 h-4 w-4" onClick={() => handleOrderChange("nazwisko")} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer">
                                        <div className="flex items-center">
                                            Date of incarceration
                                            <ArrowUpDown className="ml-1 h-4 w-4" onClick={() => handleOrderChange("data_osadzenia")} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer">
                                        <div className="flex items-center">
                                            Cell
                                            <ArrowUpDown className="ml-1 h-4 w-4" onClick={() => handleOrderChange("id_celi")} />
                                        </div>
                                    </TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPrisoners?.map((prisoner) => (
                                    <React.Fragment key={prisoner.id}>
                                        <TableRow
                                            className={
                                                expandedId === prisoner.id ? "border-b-0 hover:bg-muted/50" : "hover:bg-muted/50 bg-[var(--color-card)]/50"
                                            }
                                        >
                                            <TableCell className="p-4">{prisoner.id}</TableCell>
                                            <TableCell>{prisoner.imie}</TableCell>
                                            <TableCell>{prisoner.nazwisko}</TableCell>
                                            <TableCell>{formatDate(prisoner.data_osadzenia)}</TableCell>
                                            <TableCell>{prisoner.id_celi}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setExpandedId(expandedId === prisoner.id ? null : prisoner.id)}
                                                >
                                                    {expandedId === prisoner.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <AnimatePresence>
                                            {expandedId === prisoner.id && (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="p-0">
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="bg-muted/50 p-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    {/* Lewa kolumna - dane osobowe */}
                                                                    <div className="space-y-4 md:col-span-2">
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <p className="text-sm font-medium">Second name:</p>
                                                                                <p>{prisoner.drugieImie || "-"}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-medium">Mother's maiden name:</p>
                                                                                <p>{prisoner.nazwisko_panienskie_matki || "-"}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-medium">PESEL:</p>
                                                                                <p>{prisoner.pesel}</p>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-medium">Place of birth:</p>
                                                                                <p>{prisoner.miejsce_urodzenia}</p>
                                                                            </div>
                                                                        </div>

                                                                        {/* Informacje o wyroku */}
                                                                        <div className="space-y-2 mt-4">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                <div>
                                                                                    <p className="text-sm font-medium">Sentence:</p>
                                                                                    <p>{Math.floor(prisoner.wyrok / 365.25)} years</p>
                                                                                </div>
                                                                                <div>
                                                                                    <p className="text-sm font-medium">Sentence Details:</p>
                                                                                    <p>{prisoner.powod_wyroku}</p>
                                                                                </div>
                                                                            </div>

                                                                            {/* Pozostały czas odsiadki */}
                                                                            <div className="mt-4">
                                                                                <div className="flex items-center justify-between mb-1">
                                                                                    <p className="text-sm font-medium">Remaining serve time:</p>
                                                                                    <div className="flex items-center">
                                                                                        <Clock className="h-4 w-4 mr-1" />
                                                                                        <span className="text-sm">
                                                                                            {calculateRemainingDays(prisoner.data_osadzenia, prisoner.wyrok)}{" "}
                                                                                            days
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <Progress
                                                                                    value={
                                                                                        100 -
                                                                                        (calculateRemainingDays(prisoner.data_osadzenia, prisoner.wyrok) /
                                                                                            prisoner.wyrok) *
                                                                                            100
                                                                                    }
                                                                                    className="h-2"
                                                                                />
                                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                                    Served: {differenceInDays(new Date(), new Date(prisoner.data_osadzenia))}{" "}
                                                                                    days of {prisoner.wyrok} days
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        {/* Przyciski akcji */}
                                                                        <div className="flex justify-end space-x-2 mt-4">
                                                                            <Button variant="outline" size="sm" onClick={() => handleEdit(prisoner)}>
                                                                                <Edit className="h-4 w-4 mr-2" />
                                                                                Update
                                                                            </Button>
                                                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(prisoner.id)}>
                                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))}
                                {filteredPrisoners?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            No prisoners matching your search criteria were found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}

const TableLoadingPlaceholder = () => {
    return (
        <div className="rounded-md border bg-background shadow flex overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] p-6">
                            <Skeleton className="h-4 w-10" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-32" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-4 w-16" />
                        </TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="p-6">
                                    <Skeleton className="h-4 w-8" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-32" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-12" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};
