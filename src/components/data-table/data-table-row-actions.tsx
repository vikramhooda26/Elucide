import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import useNavigator from "../../hooks/useNavigator";
import { DataTableRowActionsProps } from "../../types/components/Table";
import { Alert } from "../Alert";

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
                className="flex h-8 w-8 p-1 data-[state=open]:bg-muted"
                onClick={() => {
                    navigator(routes.editRoute, [task.id]);
                }}
            >
                <Pencil className="w-4 h-4" />
            </Button>
            <Alert
                title={`You're about to delete ${task.name} data`}
                description="Are you sure you want to complete this action. It is irreversible and all data will be lost permanently."
                positiveOnClick={() => {
                    task.id && routes.deleteCall(task.id);
                    console.log("row --- ", row);
                }}
                positiveTitle="Delete"
                PositiveButtonStyles="bg-destructive hover:bg-destructive/60"
            >
                <Button
                    size="sm"
                    variant="destructive"
                    className="flex h-8 w-8 p-1 data-[state=open]:bg-muted"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </Alert>
        </div>
    );
}
