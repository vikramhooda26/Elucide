import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import NoDataText from "../../no-data/NoDataText";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { TSocials } from "../data/socials";

type Props = {
    data: any;
    metadatas: TSocials[];
    title: string;
};

function LinksCard({ data, metadatas, title }: Props) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const metadataUi = metadatas
        ?.filter((metadata) => data?.[metadata?.key]?.length > 0)
        .map((metadata, i) => (
            <div className="flex items-center gap-4">
                <Link to={data?.[metadata?.key]} target="_blank" key={i}>
                    <div>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{metadata?.icon}</AvatarFallback>
                        </Avatar>
                    </div>
                </Link>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {data[metadata?.key]}
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-100"
                        onClick={() => handleCopy(metadata?.key)}
                    >
                        {copiedKey === metadata.key ? (
                            <CheckIcon className="h-3 w-3" />
                        ) : (
                            <CopyIcon className="h-3 w-3" />
                        )}
                    </Button>
                </div>
            </div>
        ));

    const handleCopy = (key: string) => {
        if (data?.[key]) {
            setCopiedKey(key);
            navigator?.clipboard
                .writeText(data[key])
                .then(() => {
                    toast.success("Copied!", { duration: 2000 });
                    setTimeout(() => {
                        setCopiedKey(null);
                    }, 2000);
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to copy");
                    setCopiedKey(null);
                });
        } else {
            toast.error("Failed to copy");
        }
    };

    return (
        <Card x-chunk="dashboard-07-chunk-0" className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        {title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="grid gap-8 p-6">
                <div className="flex flex-col gap-4 text-muted-foreground">
                    {metadataUi?.length > 0 ? (
                        <>{...metadataUi}</>
                    ) : (
                        <NoDataText />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default LinksCard;
