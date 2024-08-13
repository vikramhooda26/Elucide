import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import useNavigator from "../../hooks/useNavigator";
import { DataTableRowActionsProps } from "../../types/components/Table";
import { Alert } from "../Alert";
import { useUser } from "../../hooks/useUser.tsx";

export function DataTableRowActions<TData>({
    row,
    routes,
    schema,
}: DataTableRowActionsProps<TData>) {
    const navigator = useNavigator();
    const task = schema?.parse(row.original);
    const user = useUser();

    return (
        <>
            {(user?.role === "SUPER_ADMIN" || user?.role === "ADMIN") && (
                <div className="flex gap-4">
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
                        title={`You're about to delete ${task.name}`}
                        description="Are you sure you want to complete this action? It's irreversible and all the data will be lost forever."
                        positiveOnClick={() => {
                            task.id && routes.deleteCall(task.id);
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
            )}
        </>
    );
}
