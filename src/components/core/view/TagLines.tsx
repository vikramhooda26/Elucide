import { Activity } from "lucide-react";
import { nameAndId } from "../../../types/metadata/Metadata";

type TTagLinesProps = {
    data: any;
};

function TagLines({ data }: TTagLinesProps) {
    if (data?.taglines)
        return (
            <div className="p-6 text-sm">
                <ul className="flex flex-col gap-3">
                    <li className="text-lg">
                        <span>Taglines</span>
                    </li>
                    <ul className="grid gap-3">
                        {data?.taglines?.map((tag: nameAndId, i: number) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 text-muted-foreground"
                            >
                                <span>
                                    <Activity className="h-4 w-4" />
                                </span>
                                <span>{tag?.name || "N/A"}</span>
                            </li>
                        ))}
                    </ul>
                </ul>
            </div>
        );
}

export default TagLines;
