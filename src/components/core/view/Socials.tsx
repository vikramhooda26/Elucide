import {
    InstagramLogoIcon,
    LinkedInLogoIcon,
    TwitterLogoIcon
} from "@radix-ui/react-icons";
import {
    CheckIcon,
    CopyIcon,
    FacebookIcon,
    Globe,
    YoutubeIcon
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import NoDataText from "../../no-data/NoDataText";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "../../ui/card";

type Props = {
    data: any;
};

function Socials({ data }: Props) {
    const socials = [
        { key: "instagram", name: "Instagram", icon: <InstagramLogoIcon /> },
        { key: "facebook", name: "Facebook", icon: <FacebookIcon /> },
        { key: "twitter", name: "Twitter", icon: <TwitterLogoIcon /> },
        { key: "linkedin", name: "Linkedin", icon: <LinkedInLogoIcon /> },
        { key: "youtube", name: "You Tube", icon: <YoutubeIcon /> },
        { key: "website", name: "Website", icon: <Globe /> }
    ];

    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const socialsUi = socials
        ?.filter((social) => data?.[social?.key]?.length > 0)
        .map((social, i) => (
            <div className="flex items-center gap-4">
                <Link to={data?.[social?.key]} target="_blank" key={i}>
                    <div>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{social?.icon}</AvatarFallback>
                        </Avatar>
                    </div>
                </Link>
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {data[social?.key]}
                    </p>
                </div>
                <div className="ml-auto font-medium">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-6 w-6 opacity-100"
                        onClick={() => handleCopy(social?.key)}
                    >
                        {copiedKey === social.key ? (
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
        <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
                <CardTitle>Socials</CardTitle>
                <CardDescription>
                    {/* Lipsum dolor sit amet, consectetur adipiscing elit */}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
                <div className="flex flex-col gap-4">
                    {socialsUi?.length > 0 ? (
                        <>{...socialsUi}</>
                    ) : (
                        <NoDataText />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default Socials;
