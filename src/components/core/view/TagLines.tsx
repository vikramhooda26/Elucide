import { Activity } from "lucide-react";
import { nameAndId } from "../../../types/metadata/Metadata";

type TTagLinesProps = {
    data: any;
};

function TagLines({ data }: TTagLinesProps) {
    const sortedTaglines =
        data && Object.keys(data)?.length > 0 && data?.taglines?.length > 0
            ? Array.from(data?.taglines as any[]).sort((a: any, b: any) =>
                  a.name.localeCompare(b.name)
              )
            : null;
    if (sortedTaglines?.length)
        return (
            <div className="p-6 text-sm">
                <ul className="flex flex-col gap-3">
                    <li className="text-lg">
                        <span>Taglines</span>
                    </li>
                    <ul className="grid gap-3">
                        {sortedTaglines.map((tag: nameAndId, i: number) => (
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
