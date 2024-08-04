import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { Copy, FacebookIcon, Globe, YoutubeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import NoDataText from '../../no-data/NoDataText'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Button } from '../../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'

type Props = {
    data: any;
}

function Socials({ data }: Props) {
    const socials = [
        { key: "instagram", name: 'Instagram', icon: <InstagramLogoIcon />, },
        { key: "facebook", name: 'Facebook', icon: <FacebookIcon />, },
        { key: "twitter", name: 'Twitter', icon: <TwitterLogoIcon /> },
        { key: "linkedin", name: 'Linkedin', icon: <LinkedInLogoIcon />, },
        { key: "youtube", name: 'You Tube', icon: <YoutubeIcon />, },
        { key: "website", name: 'Website', icon: <Globe />, },
    ];

    const socialsUi = socials?.filter((d) => data[d?.key]?.length > 0).map((d, i) => (
        <div className="flex items-center gap-4">
            <Link
                to={data[d?.key]}
                target="_blank"
                key={i}
            >
                <div>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage
                            src="/avatars/01.png"
                            alt="Avatar"
                        />
                        <AvatarFallback>
                            {d?.icon}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </Link>
            <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                    {data[d?.key]}
                </p>
            </div>
            <div className="ml-auto font-medium">
                <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-100"
                    onClick={() => handleCopy(d?.key)}
                >
                    <Copy className="h-3 w-3" />
                </Button>
            </div>
        </div>
    ))

    const handleCopy = (key: string) => {
        if (data[key]) {
            navigator.clipboard
                .writeText(data[key])
                .then(() => {
                    toast.success("Copied");
                }).catch((err) => { toast.error("Unable to copy."); });
        } else {
            toast.error("Unable to copy.");
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
                    {socialsUi?.length > 0 ? <>{...socialsUi}</> : <NoDataText />}
                </div>
            </CardContent>
        </Card>
    )
}

export default Socials