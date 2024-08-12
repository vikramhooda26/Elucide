import { format } from "date-fns"
import { generateColumns } from "../../../components/data-table/data-table-columns"
import { NAVIGATION_ROUTES } from "../../../lib/constants"
import { TableConfig } from "../../../types/table/TableColumns"
import { routes } from "./data"
import { League, leagueSchema } from "./schema"

const leagueConfig: TableConfig<League> = {
  schema: leagueSchema,
  routes: routes,
  showCheckbox: false,
  columns: [
    {
      key: "name",
      title: "League Name",
      sortable: false,
      hideable: false,
      route: NAVIGATION_ROUTES.LEAGUE,
    },
    {
      key: "createdDate",
      title: "Created At",
      customRender: ({ row }) => (
        <div className="flex space-x-2">
          <span className="max-w-[400px] truncate font-medium">
            {row.getValue("createdDate") ? format(row.getValue("createdDate"), "dd-MM-yyyy, HH:mm") : ""}
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
            {row.getValue("modifiedDate") ? format(row.getValue("modifiedDate"), "dd-MM-yyyy, HH:mm") : ""}
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

export const columns = generateColumns(leagueConfig);