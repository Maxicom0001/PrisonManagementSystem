"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useHeader } from "@/components/providers/header-title-provider";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/components/api/fetch-data";
import { JobDashboardSkeleton } from "./prison-jobs-skeleton";

export interface Job {
    id: number;
    nazwa: string;
    aktywne: boolean;
    employeeId: number;
}

// const employees = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
//   { id: 3, name: "Alice Johnson" },
//   { id: 4, name: "Bob Brown" },
//   { id: 5, name: "Charlie Davis" },
//]

export default function JobDashboard() {
    // const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    // const [currentJob, setCurrentJob] = useState<Job | null>(null)

    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader([{ title: "Jobs Management", href: "/jobs" }]);
    }, []);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => fetchData("api/dictionaries/jobs"),
        refetchOnWindowFocus: false,
        retry: false,
    });

    if (isLoading) return <JobDashboardSkeleton />;
    if (isError) return <div>Error: {error.message}</div>;

    // Calculate summary metrics
    const totalJobs = data.jobs.length;
    const activeJobs = data.jobs.filter((job: Job) => job.aktywne).length;
    const inactiveJobs = data.jobs.filter((job: Job) => !job.aktywne).length;

    // const handleAddJob = (job: Job) => {
    //   setIsAddDialogOpen(false)
    // }

    // const handleEditJob = (job: Job) => {
    //   setIsEditDialogOpen(false)
    // }

    // const handleDeleteJob = (id: number) => {
    //   setIsAddDialogOpen(false)
    // }

    // const openEditDialog = (id: number) => {
    //   setCurrentJob(jobs.find((job: Job) => job.id === id) || null)
    //   setIsEditDialogOpen(true)
    // }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="container mx-auto py-6 space-y-6 max-w-5xl">
            {/* Header */}
            <motion.div
                className="flex justify-between items-start"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Job Management</h1>
                    <p className="text-muted-foreground mt-1">Manage and track all job positions in your organization</p>
                </div>
                {/* <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center mt-5">
          <Plus className="size-4" />
          Add Job
        </Button> */}
            </motion.div>

            {/* Summary Bar */}
            <motion.div className="grid grid-cols-3 gap-4" variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                    <Card>
                        <CardContent>
                            <div className="text-sm font-medium text-muted-foreground">Total Jobs</div>
                            <div className="text-3xl font-bold">{totalJobs}</div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={item}>
                    <Card>
                        <CardContent>
                            <div className="text-sm font-medium text-muted-foreground">Active</div>
                            <div className="text-3xl font-bold">{activeJobs}</div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={item}>
                    <Card>
                        <CardContent>
                            <div className="text-sm font-medium text-muted-foreground">Inactive</div>
                            <div className="text-3xl font-bold">{inactiveJobs}</div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Jobs Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                <Card className="p-0">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[var(--color-muted)]/50">
                                    <TableHead className="p-5">Job Name</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    {/* <TableHead className="text-right">Actions</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-[var(--color-card)]">
                                {data.jobs.map((job: Job) => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-medium p-5">{job.nazwa}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={job.aktywne ? "default" : "outline"}>{job.aktywne ? "Active" : "Inactive"}</Badge>
                                        </TableCell>
                                        {/* <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(job.id)}>
                        <Edit className="size-4" />
                        <span className="sr-only">Edit job</span>
                      </Button>
                    </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Dialogs */}
            {/* <AddJobDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddJob}
        employees={employees}
      />
      <EditJobDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleEditJob}
        onDelete={handleDeleteJob}
        job={currentJob}
        employees={employees}
      /> */}
        </div>
    );
}
