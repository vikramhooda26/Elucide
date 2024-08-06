import * as React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";

type TInputDrawerProps = {
    title: string;
    description?: string;
    children?: React.ReactNode;
    onSubmit: () => void;
    inputType?: string;
    field: ControllerRenderProps<any>;
};

export const InputDrawer: React.FC<TInputDrawerProps> = ({
    title,
    description,
    children,
    onSubmit,
    inputType = "text",
    field,
}) => {
    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        {description && (
                            <DrawerDescription>{description}</DrawerDescription>
                        )}
                    </DrawerHeader>
                    <div className="p-4">
                        <Input
                            {...field}
                            type={inputType}
                            placeholder={title}
                        />
                    </div>
                    <DrawerFooter>
                        <Button
                            onClick={onSubmit}
                            className="active:brightness-75"
                        >
                            Submit
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Discard</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
