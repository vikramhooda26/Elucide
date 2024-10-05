import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

function TableSkeleton() {
    return (
        <div className="h-full w-full animate-pulse">
            <Card className="h-[85vh] w-full border-none">
                <CardHeader className="h-[15%] px-7">
                    <CardTitle className="w-52 rounded-md bg-gray-400 px-10 py-5"></CardTitle>
                    <CardDescription className="w-80 rounded-md bg-gray-400 px-20 py-2"></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="my-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-8 w-64 rounded-md border border-gray-400"></div>
                            <div className="ms-2 h-8 w-40 rounded-md bg-gray-400"></div>
                            <div className="ms-2 h-8 w-40 rounded-md bg-gray-400"></div>
                        </div>
                        <div>
                            <div className="h-8 w-20 rounded-md bg-gray-400"></div>
                        </div>
                    </div>
                    <Table className="rounded-md">
                        <TableHeader>
                            <TableRow>
                                {[1, 2, 3, 4, 5].map((c, i) => (
                                    <TableHead className="h-11">
                                        <div className="h-5 w-28 rounded-md bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((c, i) => (
                                <TableRow key={i} className={cn("h-11", i % 2 !== 0 ? "bg-accent" : "")}>
                                    {[1, 2, 3, 4, 5].map((c, i) => (
                                        <TableCell className="">
                                            <div className="h-5 w-28 rounded-md bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default TableSkeleton;
