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
    <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 ">
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

            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Socials</CardTitle>
                <CardDescription>
                  {/* Lipsum dolor sit amet, consectetur adipiscing elit */}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card" className="grid grid-cols-5 gap-4">
                  <Table>
                    <TableBody>
                      {socialLinks?.map((d, i: number) => (
                        <TableRow>
                          <TableCell key={i} className="font-semibold">
                            <Link to={d?.link} target="_blank" key={i}>
                              <div>
                                <RadioGroupItem value="card" id={"card" + i} className="peer sr-only" />
                                <Label
                                  htmlFor={"card" + i}
                                  className="h-14 cursor-pointer flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  {d?.icon}
                                </Label>
                              </div>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </RadioGroup>
              </CardContent>

            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
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
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Team Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">

                  {teamAttributes?.map((d, i: number) => (
                    <div className="grid gap-3" key={i}>
                      <Label htmlFor={d?.title?.toLowerCase()}>{d?.title}</Label>
                      <Select>
                        <SelectTrigger id={d?.title?.toLowerCase()} aria-label="Select status">
                          <SelectValue placeholder={`Select ${d?.title?.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Active</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}


                </div>
              </CardContent>
            </Card>
            <Card
              className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
            >
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height={300}
                    src="/placeholder.svg"
                    width={300}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height={84}
                        src="/placeholder.svg"
                        width={84}
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height={84}
                        src="/placeholder.svg"
                        width={84}
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
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
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Team</Button>
        </div>
      </div>
    </main >
  )
}

export default TeamView;