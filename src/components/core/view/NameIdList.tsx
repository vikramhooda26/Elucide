import React from "react";
import { nameAndId } from "../../../types/metadata/Metadata";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";

type Props = {
    data: [nameAndId | undefined] | undefined;
    navLink: string;
    title: string;
};
function NameIdList({ data, navLink, title }: Props) {
    return (
        <div className="grid gap-3 rounded-md border p-4">
            <div>{title}</div>
            <ul className="grid grid-cols-2 gap-3">
                {data && data?.length > 0 ? (
                    data?.map((sub: nameAndId | undefined, i: number) => (
                        <li key={i} className="me-5 flex items-center gap-2">
                            <Link to={navLink + `/${sub?.id}`} className="flex items-center gap-2">
                                <span>{i + 1}</span>
                                <span className="text-muted-foreground">{sub?.name}</span>

                                <SquareArrowOutUpRight className="h-4 w-4" />
                            </Link>
                        </li>
                    ))
                ) : (
                    <NoDataText />
                )}
            </ul>
        </div>
    );
}

export default NameIdList;
