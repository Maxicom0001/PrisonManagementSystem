"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Edit, Search, Trash2, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHeader } from "@/components/providers/header-title-provider";
import fetchData from "@/components/api/fetch-data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import deleteData from "@/components/api/delete-data";
import { toast, ToastT } from "sonner";
import { useRouter } from "next/navigation";

// Types
interface Employee {
    id: number;
    imie: string;
    nazwisko: string;
    pesel: string;
    pensja: number;
    zadanie: string;
    id_zadania: number;
    id_budynku: number;
}

// Loading placeholder for employee cards
const EmployeeCardLoadingPlaceholder = () => {
    return (
        <>
            {Array(3)
                .fill(0)
                .map((_, index) => (
                    <Card key={index} className="w-full mb-4">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center">
                                {/* Left section - Photo and basic info */}
                                <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/5">
                                    <Skeleton className="h-40 w-40 rounded-md" />
                                    <div className="space-y-2 w-full">
                                        <Skeleton className="h-6 w-full" />
                                        <div className="flex flex-col space-y-1">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Middle section - Task */}
                                <div className="md:w-3/5 flex-grow mt-3 md:mt-0 md:px-6">
                                    <Skeleton className="h-5 w-1/4 mb-2" />
                                    <Skeleton className="h-24 w-full" />
                                </div>

                                {/* Right section - Actions */}
                                <div className="flex md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:w-1/5 md:items-end">
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </>
    );
};

export default function EmployeeDatabase() {
    const { setHeader } = useHeader();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data, isLoading, isError, error, refetch } = useQuery({
        staleTime: 0,
        queryKey: ["workers"],
        queryFn: () => fetchData("api/workers"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        setHeader([{ title: "Workers Management", href: "/workers" }]);
    }, []);

    const [searchTerm, setSearchTerm] = useState("");

    // Filter employees based on search
    const filteredEmployees = data?.filter((employee: Employee) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            employee.id.toString().includes(searchTerm) ||
            employee.imie.toLowerCase().includes(searchLower) ||
            employee.nazwisko.toLowerCase().includes(searchLower) ||
            employee.pesel.includes(searchTerm)
        );
    });

    // Function to handle adding a new employee
    const handleAddEmployee = () => {
        console.log("Adding new employee");
        // Add your logic for adding an employee
    };

    // Function to handle editing
    const handleEdit = (employee: Employee) => {
        console.log(`Editing employee with ID: ${employee.id}`);
        router.push("/workers/edit?id=" + employee.id + "&firstName=" + employee.imie + "&lastName=" + employee.nazwisko + "&pesel=" + employee.pesel + "&pensja=" + employee.pensja + "&buildingId=" + employee.id_budynku + "&jobId=" + employee.id_zadania);
    };

    // Function to handle deleting
    const handleDelete = (id: number) => {
        deleteData("api/workers/" + id, {});
        refetch();
        toast.success("Employee deleted successfully", {
            description: "The employee has been removed from the database.",
        });
        queryClient.invalidateQueries({ queryKey: ["workers"] });
        queryClient.refetchQueries({ queryKey: ["workers"] });
        
    };

    // Function to handle adding a task
    const handleAddTask = (id: number) => {
        console.log(`Adding task for employee with ID: ${id}`);
        // Add your logic for adding a task
    };

    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col h-full space-y-4 max-w-7xl p-6 w-full">
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        disabled={isLoading}
                    />
                </div>
                <Button disabled={isLoading} asChild>
                    <Link href="/workers/add">
                        <UserPlus className="h-4 w-4" />
                        Add Employee
                    </Link>
                </Button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    className="space-y-4"
                >
                    {isLoading ? (
                        <EmployeeCardLoadingPlaceholder />
                    ) : (
                        <div>
                            {filteredEmployees.map((employee: Employee) => (
                                <Card key={employee.id} className="w-full mb-3">
                                    <CardContent className="p-6">
                                        <div className="flex md:flex-col-3 flex-col md:flex-row md:items-center">
                                            {/* Left section - Photo and basic info */}
                                            <div className="flex flex-col items-center md:items-start space-y-4">
                                                <div className="bg-muted h-40 w-40 rounded-md flex items-center justify-center">
                                                    <span className="text-muted-foreground">Photo</span>
                                                </div>
                                                <div className="space-y-2 text-center md:text-left">
                                                    <h3 className="font-medium text-lg">
                                                        {employee.imie} {employee.nazwisko}
                                                    </h3>
                                                    <div className="text-sm text-muted-foreground">
                                                        <p>PESEL: {employee.pesel}</p>
                                                        <p>Salary: {employee.pensja}$</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle section - Task */}
                                            <div className="flex-grow mt-3 md:mt-0 md:px-6">
                                                <h4 className="font-medium mb-2">Current Task</h4>
                                                <ScrollArea className="h-32 rounded-md border p-4">
                                                    <p className="text-sm">{employee.zadanie}</p>
                                                </ScrollArea>
                                            </div>

                                            {/* Right section - Actions */}
                                            <div className="flex md:flex-col justify-end space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:items-end">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="outline" size="icon" onClick={() => handleEdit(employee)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Edit Employee</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button variant="destructive" size="icon" onClick={() => handleDelete(employee.id)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Delete Employee</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {filteredEmployees.length === 0 && (
                                <div className="text-center py-8 border rounded-md bg-background">No employees found matching your search criteria</div>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
