
"use client"

import { cn } from '../../lib/utils'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"


function TableSkeleton() {
    return (
        <div className=' w-full h-full animate-pulse  '>
            <Card className='w-full h-[85vh] border-none'>
                <CardHeader className="px-7 h-[15%]">
                    <CardTitle className='px-10 py-5 bg-gray-400 w-52 rounded-md '></CardTitle>
                    <CardDescription className='px-20 py-2 bg-gray-400 w-80 rounded-md'></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex items-center justify-between my-4'>
                        <div className='flex items-center'>
                            <div className='w-64 h-8 border border-gray-400 rounded-md'></div>
                            <div className='w-40 h-8 bg-gray-400 rounded-md ms-2'></div>
                            <div className='w-40 h-8 bg-gray-400 rounded-md ms-2'></div>
                        </div>
                        <div>
                            <div className='w-20 h-8 bg-gray-400 rounded-md '></div>
                        </div>
                    </div>
                    <Table className='rounded-md'>
                        <TableHeader>
                            <TableRow>
                                {[1, 2, 3, 4, 5,].map((c, i) => (
                                    <TableHead className="h-11">
                                        <div className='w-28 h-5 rounded-md bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 '></div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((c, i) => (
                                <TableRow key={i} className={cn('h-11', i % 2 !== 0 ? 'bg-accent' : '')}>
                                    {[1, 2, 3, 4, 5,].map((c, i) => (
                                        <TableCell className=''>
                                            <div className='w-28 h-5 rounded-md bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 '></div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default TableSkeleton;