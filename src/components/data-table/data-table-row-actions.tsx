import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import useNavigator from "../../hooks/useNavigator";
import { DataTableRowActionsProps } from "../../types/components/Table";

export function DataTableRowActions<TData>({
    row,
    routes,
    schema,
}: DataTableRowActionsProps<TData>) {
    const navigator = useNavigator();
    const task = schema?.parse(row.original);

    return (
        <div className="grid grid-cols-2 gap-2 ">
            <Button
                size="sm"
                variant="secondary"
                className="flex h-8 w-8 p-1 data-[state=open]:bg-muted"
                onClick={(e) => {
                    e?.stopPropagation();
                    navigator(routes.editRoute, [task.id]);
                }}
            >
                <Pencil className="w-4 h-4" />
            </Button>
            <Button
                size="sm"
                variant="destructive"
                className="flex h-8 w-8 p-1 data-[state=open]:bg-muted"
                onClick={(e) => {
                    e?.stopPropagation();
                    task.id && routes.deleteCall(task.id);
                    console.log('row --- ', row);
                }}
            >
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    );
}
