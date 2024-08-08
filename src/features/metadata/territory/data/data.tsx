import {
    ArrowDownIcon,
    ArrowRightIcon,
    ArrowUpIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon,
} from "@radix-ui/react-icons";
import { NAVIGATION_ROUTES } from "../../../../lib/constants";

export const routes = {
    editRoute: NAVIGATION_ROUTES.TERRITORY_EDIT,
    deleteRoute: () => {},
};

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
];

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
];
