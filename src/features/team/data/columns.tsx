import { Team, teamSchema } from "./schema";
import { routes } from "./data";
import { generateColumns } from "../../../components/data-table/data-table-columns";
import { TableConfig } from "../../../types/table/TableColumns";
import { format } from "date-fns";

const teamConfig: TableConfig<Team> = {
  schema: teamSchema,
  routes: routes,
  showCheckbox: false,
  columns: [
    {
      key: "name",
      title: "Team Name",
      sortable: false,
      hideable: false,
      route: "/teams",
    },
    {
      key: "createdDate",
      title: "Created At",
      customRender: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[400px] truncate font-medium">
            {row.getValue("createdDate")
              ? format(row.getValue("createdDate"), "dd-MM-yyyy, HH:mm")
              : ""}
          </span>
        </div>
      ),
    },
    {
      key: "createdBy",
      title: "Created By",
    },
    {
      key: "modifiedDate",
      title: "Modified At",
      customRender: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[400px] truncate font-medium">
            {row.getValue("modifiedDate")
              ? format(row.getValue("modifiedDate"), "dd-MM-yyyy, HH:mm")
              : ""}
          </span>
        </div>
      ),
    },
    {
      key: "modifiedBy",
      title: "Modified By",
    },
  ],
};

export const columns = generateColumns(teamConfig);
