import {
  ArrowDownIcon,
  ArrowUpIcon
} from "@radix-ui/react-icons"
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants"
import MetadataService from "../../../services/features/MetadataService";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";
import { isDeletedAtom, listLoadingAtom } from "../../../store/atoms/global";

const deleteCall = async (id: string) => {
  // const setIsDeleted = useSetRecoilState(isDeletedAtom);
  const response = await MetadataService.deleteData(id, '/api/admin/league/delete/');
  if (response.status === HTTP_STATUS_CODES.OK) {
    // setIsDeleted(true);
    toast.success("Deleted successfully");
  } else {
    // setIsDeleted(false);
    toast.error("Unable to delete.");
  }
}

export const routes = { editRoute: NAVIGATION_ROUTES.EDIT_LEAGUE, copyRoute: NAVIGATION_ROUTES.EDIT_LEAGUE, deleteCall: (id: string) => { deleteCall(id) }, }

export const statuses = [
  {
    value: "recent",
    label: "Recent",
    icon: ArrowDownIcon,
  },
  {
    value: "earlier",
    label: "Earlier",
    icon: ArrowUpIcon,
  },
]

export const priorities = [
  {
    value: "recent",
    label: "Recent",
    icon: ArrowDownIcon,
  },
  {
    value: "earlier",
    label: "Earlier",
    icon: ArrowUpIcon,
  },
]
