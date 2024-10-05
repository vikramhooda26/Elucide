import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import MetadataService from "../../../services/features/MetadataService";

const deleteCall = async (id: string) => {
    try {
        const response = await MetadataService.deleteData(id, "/api/admin/league/delete/");

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
    editRoute: NAVIGATION_ROUTES.EDIT_LEAGUE,
    copyRoute: NAVIGATION_ROUTES.EDIT_LEAGUE,
    deleteCall: async (id: string) => {
        const isDeleted = await deleteCall(id);
        return isDeleted;
    }
};

export const statuses = [
    {
        value: "recent",
        label: "Recent",
        icon: ArrowDownIcon
    },
    {
        value: "earlier",
        label: "Earlier",
        icon: ArrowUpIcon
    }
];

export const priorities = [
    {
        value: "recent",
        label: "Recent",
        icon: ArrowDownIcon
    },
    {
        value: "earlier",
        label: "Earlier",
        icon: ArrowUpIcon
    }
];
