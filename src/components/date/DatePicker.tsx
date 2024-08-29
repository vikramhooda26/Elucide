import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function DatePicker({
    placeholder = "date",
    value,
    onChange
}: {
    placeholder: string;
    value: Date | undefined;
    onChange: (e: any) => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        "pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                    variant="outline"
                >
                    {value ? (
                        format(value, "dd/MM/yyyy")
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-2">
                <CalendarComponent
                    initialFocus
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                />
            </PopoverContent>
        </Popover>
    );
}
