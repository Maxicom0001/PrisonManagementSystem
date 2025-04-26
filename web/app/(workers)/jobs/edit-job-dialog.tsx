"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Job } from "./page";

interface EditJobDialogProps {
    job: Job | null;
    employees: { id: number; name: string }[];
    onOpenChange: (open: boolean) => void;
    open: boolean;
    onSave: (job: Job) => void;
    onDelete: (id: number) => void;
}

export function EditJobDialog({ job, employees, onOpenChange, open, onSave, onDelete }: EditJobDialogProps) {
    const [jobTitle, setJobTitle] = useState(job?.nazwa);
    const [employeeId, setEmployeeId] = useState<string>(job?.employeeId?.toString() || "");
    const [isActive, setIsActive] = useState<boolean>(job?.aktywne || true);

    // Update form when job changes
    //   useEffect(() => {
    //     setJobTitle(job.nazwa)
    //     setEmployeeId(job.employeeId?.toString() || "")
    //     setIsActive(job.aktywne === 1)
    //   }, [job])

    const handleSave = () => {
        console.log("Saving job...");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Job</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-job-title">Job Title</Label>
                        <Input id="edit-job-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-employee-id">Employee</Label>
                        <Select value={employeeId} onValueChange={setEmployeeId}>
                            <SelectTrigger id="edit-employee-id">
                                <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {employees.map((employee) => (
                                    <SelectItem key={employee.id} value={employee.id.toString()}>
                                        {employee.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="job-status" checked={isActive} onCheckedChange={(checked) => setIsActive(checked === true)} />
                        <Label htmlFor="job-status">Active</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={() => onDelete(job?.id || 0)}>
                        Delete
                    </Button>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
