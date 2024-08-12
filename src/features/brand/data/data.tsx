import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants"
import MetadataService from "../../../services/features/MetadataService"
import { toast } from "sonner";

const deleteCall = async (id: string) => {
  const response = await MetadataService.deleteData(id, '/api/admin/brand/delete/');
  if (response.status === HTTP_STATUS_CODES.OK) {
    toast.success("Deleted successfully");
  } else {
    toast.error("Unable to delete.");
  }
}

export const routes = { editRoute: NAVIGATION_ROUTES.EDIT_BRAND, copyRoute: NAVIGATION_ROUTES.EDIT_BRAND, deleteCall: (id: string) => { deleteCall(id) }, }

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "2020",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "2023",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "2024",
    value: "high",
    icon: ArrowUpIcon,
  },
]
