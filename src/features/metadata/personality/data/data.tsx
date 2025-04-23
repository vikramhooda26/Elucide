import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from "@radix-ui/react-icons";
import { NAVIGATION_ROUTES } from "../../../../lib/constants";

export const routes = {
  editRoute: NAVIGATION_ROUTES.PERSONALITY_EDIT,
  copyRoute: NAVIGATION_ROUTES.PERSONALITY_EDIT,
  deleteRoute: () => {}
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
