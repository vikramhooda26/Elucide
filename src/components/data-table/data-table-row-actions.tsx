import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import useNavigator from "../../hooks/useNavigator";
import { DataTableRowActionsProps } from "../../types/components/Table";

export function DataTableRowActions<TData>({
    row,
    routes,
    schema,
}: DataTableRowActionsProps<TData>) {
    const navigator = useNavigator();
    const task = schema?.parse(row.original);
    console.log("task -=- ", task);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[160px]"
            >
                <DropdownMenuItem
                    onClick={(e) => {
                        e?.stopPropagation();
                        navigator(routes.editRoute, [task.id]);
                    }}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e?.stopPropagation();
                        navigator(routes.editRoute, [task.id]);
                    }}
                >
                    Make a copy
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={(e) => {
                        e?.stopPropagation();
                        routes.deleteRoute();
                    }}
                >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
