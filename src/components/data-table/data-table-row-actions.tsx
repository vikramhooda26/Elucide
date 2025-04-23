import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useUser } from "../../hooks/useUser.tsx";
import { DataTableRowActionsProps } from "../../types/components/Table";
import { Alert } from "../Alert";

export function DataTableRowActions<TData>({
  row,
  onDelete,
  onEdit,
  schema,
  canEdit = false
}: DataTableRowActionsProps<TData>) {
  const task = schema?.parse(row.original);
  const user = useUser();

  return (
    <div className="flex gap-4">
      {canEdit && (
        <>
          <Button size="sm" className="flex h-8 w-8 p-1 data-[state=open]:bg-muted" onClick={() => onEdit(task.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          {user?.role === "SUPER_ADMIN" && (
            <Alert
              title={`You're about to delete this data`}
              description="Are you sure you want to complete this action? It's irreversible and all the data will be lost forever."
              positiveOnClick={async () => onDelete(task.id)}
              positiveTitle="Delete"
              PositiveButtonStyles="bg-destructive hover:bg-destructive/60"
            >
              <Button size="sm" variant="destructive" className="flex h-8 w-8 p-1 data-[state=open]:bg-muted">
                <Trash2 className="h-4 w-4" />
              </Button>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}
