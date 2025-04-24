import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PrisonJobs() {
    const jobs = [
        { nazwa: "Kitchen Staff", aktywne: 1 },
        { nazwa: "Laundry Worker", aktywne: 1 },
        { nazwa: "Cleaning Crew", aktywne: 1 },
        { nazwa: "Library Assistant", aktywne: 1 },
        { nazwa: "Workshop Laborer", aktywne: 1 },
        { nazwa: "Gardener", aktywne: 0 },
        { nazwa: "Maintenance", aktywne: 1 },
    ];

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Prace w Więzieniu</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[70%]">Nazwa</TableHead>
                                <TableHead className="text-center">Aktywne</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow key={job.nazwa}>
                                    <TableCell className="font-medium">{job.nazwa}</TableCell>
                                    <TableCell className="text-center">
                                        {job.aktywne === 1 ? (
                                            <div className="flex justify-center">
                                                <Check className="h-5 w-5 text-green-500" />
                                            </div>
                                        ) : (
                                            <div className="flex justify-center">
                                                <X className="h-5 w-5 text-red-500" />
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
