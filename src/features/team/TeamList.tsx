import { useEffect, useState } from "react";
import { DataTable } from "../../components/table/data-table";
import { getTaskList } from "../templates/examples/tasks/data/tasksList";
import { columns } from "./data/columns";
import { priorities, statuses } from "./data/data";

function TeamList() {
  const [tasks, setTasks] = useState<Array<any>>([]);
  const fetchTasks = async () => { const resp = getTaskList; setTasks(resp) }
  useEffect(() => {
    fetchTasks();
  }, [])
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team List</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your team.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          Create Team
        </div>
      </div>
      <DataTable data={tasks} columns={columns} toolbarAttri={{ statuses, priorities }} />
    </div>
  )
}

export default TeamList;