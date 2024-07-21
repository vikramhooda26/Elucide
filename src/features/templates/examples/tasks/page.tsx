
import { useEffect, useState } from "react"
import Image from "../../../../components/image/Image"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { getTaskList } from './data/tasksList'

function TaskPage() {
  const [tasks, setTasks] = useState<Array<any>>([]);
  const fetchTasks = async () => { const resp = getTaskList; setTasks(resp) }
  useEffect(() => {
    fetchTasks();
  }, [])
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">League List</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your league for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}

export default TaskPage;