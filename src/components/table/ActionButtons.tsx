/* eslint-disable react/react-in-jsx-scope */
import { Row } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useUser } from "../../hooks/useUser.tsx";
import { Alert } from "../Alert";

interface ActionButtonsProps<TData> {
    row: Row<TData>;
    onDelete?: (id: string) => void;
    onEdit?: (id: string) => void;
    canEdit?: boolean;
}
export function ActionButtons<TData>({
    row,
    onDelete,
    onEdit,
    canEdit = false
}: ActionButtonsProps<TData>) {
    const id = (row.original as { id: string }).id;
    const user = useUser();

    return (
        <div className="flex gap-4">
            {canEdit && (
                <>
                    {onEdit ? (
                        <Button
                            size="sm"
                            className="flex h-8 w-8 p-1 data-[state=open]:bg-muted"
                            onClick={() => onEdit && onEdit(id)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    ) : null}
                    {user?.role === "SUPER_ADMIN" && onDelete && (
                        <Alert
                            title={`You're about to delete this data`}
                            description="Are you sure you want to complete this action? It's irreversible and all the data will be lost forever."
                            positiveOnClick={async () =>
                                onDelete && onDelete(id)
                            }
                            positiveTitle="Delete"
                            PositiveButtonStyles="bg-destructive hover:bg-destructive/60"
                        >
                            <Button
                                size="sm"
                                variant="destructive"
                                className="flex h-8 w-8 p-1 data-[state=open]:bg-muted"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </Alert>
                    )}
                </>
            )}
        </div>
    );
}
