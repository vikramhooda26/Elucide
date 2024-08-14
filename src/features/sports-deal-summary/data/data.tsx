import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import MetadataService from "../../../services/features/MetadataService";

const deleteCall = async (id: string): Promise<boolean> => {
    try {
        const response = await MetadataService.deleteData(
            id,
            "/api/admin/sports-deal-summary/delete/"
        );
        if (response.status === HTTP_STATUS_CODES.OK) {
            toast.success("Deleted successfully");
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const routes = {
    editRoute: NAVIGATION_ROUTES.EDIT_SPORTS_DEAL_SUMMARY,
    deleteCall: async (id: string) => await deleteCall(id),
};

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
];

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
];
