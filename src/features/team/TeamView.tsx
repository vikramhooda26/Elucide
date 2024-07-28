import {
  ChevronLeft,
  FacebookIcon,
  Globe,
  Pencil,
  Upload,
  YoutubeIcon
} from "lucide-react";

import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import Image from "../../components/image/Image";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "../../components/ui/table";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";

const teamAttributes = [
  {
    title: 'Sports',
  },
  {
    title: 'League',
  },
  {
    title: 'Owners',
  },
  {
    title: 'City',
  },
  {
    title: 'State',
  },
  {
    title: 'Personality Traits',
  },
  {
    title: 'Tier',
  }
];

const socialLinks = [
  {
    title: 'Instagram',
    icon: <InstagramLogoIcon />,
    image: '',
    link: 'https://www.instagram.com',
  },
  {
    title: 'Facebook',
    icon: <FacebookIcon />,
    image: '',
    link: 'https://www.facebook.com',
  },
  {
    title: 'Linkedin',
    icon: <LinkedInLogoIcon />,
    image: '',
    link: 'https://www.linkedin.com',
  },
  {
    title: 'You Tube',
    icon: <YoutubeIcon />,
    image: '',
    link: 'https://www.youtube.com',
  },
  {
    title: 'Website',
    icon: <Globe />,
    image: '',
    link: 'https://www.instagram.com',
  },
];

function TeamView() {

  return (
    <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Team View
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button size="sm"><Pencil className="w-4 h-4" /> </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <div className=" m-3">
                <ul className="grid gap-3">
                  <li className="flex items-center ">
                    <span className="w-1/2">
                      Name
                    </span>
                    <span className="text-muted-foreground">IPL</span>
                  </li>
                  <li className="flex items-center ">
                    <span className="w-1/2">
                      Year Of Inception
                    </span>
                    <span className="text-muted-foreground" >2010</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Socials</CardTitle>
                <CardDescription>
                  {/* Lipsum dolor sit amet, consectetur adipiscing elit */}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex flex-col gap-4">
                  {socialLinks?.map((d, i: number) => (
                    <div className="flex items-center gap-4">
                      <Link to={d?.link} target="_blank" key={i}>
                        <div >
                          <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{d?.icon}</AvatarFallback>
                          </Avatar>
                        </div>
                      </Link>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {d?.link}
                        </p>
                        {/* <p className="text-sm text-muted-foreground">
                          olivia.martin@email.com
                        </p> */}
                      </div>
                      <div className="ml-auto font-medium">Copy</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger
                        id="category"
                        aria-label="Select category"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">
                          Electronics
                        </SelectItem>
                        <SelectItem value="accessories">
                          Accessories
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">
                      Subcategory (optional)
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">
                          Sweatshirts
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Team Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    {teamAttributes?.map((d, i: number) => (
                      <div className="grid gap-3" key={i}>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">{d?.title}</span>
                          <span>{d?.title}{" 1"}</span>
                        </li>
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle>Archive Product</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div></div>
              <Button size="sm" variant="secondary">
                Archive Product
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div >
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm">Save Team</Button>
      </div>
    </div >
    </main >
  )
}

export default TeamView;