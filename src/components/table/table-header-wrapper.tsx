import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";

type TTableHeaderWrapperProps = {
    headersArray?: { header: string; className?: string }[];
    children?: React.ReactNode;
};

export const TableHeaderWrapper: React.FC<TTableHeaderWrapperProps> = ({
    headersArray,
    children
}): JSX.Element => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headersArray?.map((tableHeader) => (
                        <TableHead className={tableHeader.className}>
                            {tableHeader.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>{children}</TableBody>
        </Table>
    );
};
