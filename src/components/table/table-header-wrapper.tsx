import { cn } from "../../lib/utils";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";

type TTableHeaderWrapperProps = {
    headersArray?: { header: string; className?: string }[];
    children?: React.ReactNode;
    containerClassName?: string;
};

export const TableHeaderWrapper: React.FC<TTableHeaderWrapperProps> = ({
    headersArray,
    children,
    containerClassName
}): JSX.Element => {
    return (
        <Table className={cn(containerClassName)}>
            <TableHeader>
                <TableRow>
                    {headersArray?.map((tableHeader, index) => (
                        <TableHead className={cn("text-white", tableHeader.className)} key={index}>
                            {tableHeader.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>{children}</TableBody>
        </Table>
    );
};
