import { Athlete, athleteSchema } from "./schema";
import { routes } from "./data";
import { generateColumns } from "../../../components/data-table/data-table-columns";
import { TableConfig } from "../../../types/table/TableColumns";
import { format } from "date-fns";

const athleteConfig: TableConfig<Athlete> = {
  schema: athleteSchema,
  routes: routes,
  showCheckbox: true,
  columns: [
    {
      key: "name",
      title: "Athlete Name",
      sortable: false,
      hideable: false,
      route: "/athletes",
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

export const columns = generateColumns(athleteConfig);
