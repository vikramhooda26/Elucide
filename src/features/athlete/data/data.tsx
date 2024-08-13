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
import { toast } from "sonner";
import MetadataService from "../../../services/features/MetadataService";

const deleteCall = async (id: string) => {
  try {
      const response = await MetadataService.deleteData(
          id,
          "/api/admin/athlete/delete/"
      );
      if (response.status === HTTP_STATUS_CODES.OK) {
          toast.success("Deleted successfully");
          return true;
      } else {
          toast.error("Unable to delete.");
          return false;
      }
  } catch (error) {
      toast.error("Unable to delete.");
      return false;
  }
};

export const routes = {
  editRoute: NAVIGATION_ROUTES.EDIT_ATHLETE,
  copyRoute: NAVIGATION_ROUTES.EDIT_ATHLETE,
  deleteCall: async (id: string) => {
    const isDeleted = await deleteCall(id);
    return isDeleted;
  },
}

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
