"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function DatePicker({ placeholder = "date" }) {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={cn(
                        " pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    variant="outline"
                >
                    {date ? (
                        format(date, "dd/MM/yyyy")
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-auto p-2"
            >
                <CalendarComponent
                    initialFocus
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                />
            </PopoverContent>
        </Popover>
    );
}
