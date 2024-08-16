import React from 'react'
import { nameAndId } from '../../../types/metadata/Metadata';
import { Link } from 'react-router-dom';
import { SquareArrowOutUpRight } from 'lucide-react';
import NoDataText from '../../no-data/NoDataText';

type Props = {
    data: [nameAndId | undefined] | undefined;
    navLink: string;
    title: string;
}
function NameIdList({ data, navLink, title }: Props) {
    return (

        <div className="grid gap-3 border rounded-md p-4">
            <div>
                {title}
            </div>
            <ul className="grid gap-3 grid-cols-2 ">
                {data && data?.length > 0 ? data?.map(
                    (sub: nameAndId | undefined, i: number) => (
                        <li
                            key={i}
                            className="flex items-center gap-2 me-5"
                        >
                            <Link to={navLink + `/${sub?.id}`} className="flex items-center gap-2">
                                <span >
                                    {i + 1}
                                </span>
                                <span className="text-muted-foreground">{sub?.name}</span>

                                <SquareArrowOutUpRight className="w-4 h-4" />
                            </Link>
                        </li>))
                    :
                    <NoDataText />
                }
            </ul>
        </div>
    )
}

export default NameIdList;