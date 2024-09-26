import React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"

export type TableData = Record<string, string | number>

export interface ColumnDefinition {
    key: string
    label: string
}

export interface DynamicTableProps {
    data: TableData[]
    columns: ColumnDefinition[]
    caption?: string
}

export default function SimpleTable({ data, columns, caption }: DynamicTableProps) {
    if (!data || data.length === 0) {
        return <p>No data available</p>
    }

    return (
        <div className="container mx-auto py-10 overflow-x-auto">
            <Table>
                {/* {caption && <TableCaption>{caption}</TableCaption>} */}
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key} className="whitespace-nowrap">
                                {column.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <TableCell key={`${index}-${column.key}`} className="whitespace-nowrap">
                                    {row[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
