import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

interface CardWrapperProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
    title,
    description,
    children,
}) => {
    return (
        <Card x-chunk="dashboard-07-chunk-3">
            {title || description ? (
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
            ) : null}
            <CardContent>{children}</CardContent>
        </Card>
    );
};

CardWrapper;
