import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, Globe, YoutubeIcon } from "lucide-react";

export const socials = [
    { key: "instagram", name: "Instagram", icon: <InstagramLogoIcon /> },
    { key: "facebook", name: "Facebook", icon: <FacebookIcon /> },
    { key: "twitter", name: "Twitter", icon: <TwitterLogoIcon /> },
    { key: "linkedin", name: "Linkedin", icon: <LinkedInLogoIcon /> },
    { key: "youtube", name: "You Tube", icon: <YoutubeIcon /> },
    { key: "website", name: "Website", icon: <Globe /> }
];

export type TSocials = (typeof socials)[number];
