import {
    ChevronLeft,
    FacebookIcon,
    Globe,
    Pencil,
    YoutubeIcon,
} from "lucide-react";

import {
    InstagramLogoIcon,
    LinkedInLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Attributes from "../../components/core/view/Attributes";
import ContactPerson from "../../components/core/view/ContactPerson";
import Marketing from "../../components/core/view/Marketing";
import Socials from "../../components/core/view/Socials";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import AthleteService from "../../services/features/AthleteService";
import BackButton from "../../components/button/BackButton";
import { differenceInYears, format } from "date-fns";
import { nameAndId } from "../../types/metadata/Metadata";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { useUser } from "../../hooks/useUser";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import Association from "../../components/core/view/Association";
import Activation from "../../components/core/view/Activation";

function AthleteView() {
    const { id } = useParams<string>();
    const [athlete, setAthlete] = useState<any>({});
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const userRole = useUser()?.role;
    if (!userRole) {
        return;
    }

    const fetchTeam = async () => {
        try {
            setLoading(true);
            if (!id) {
                setLoading(false);
                return;
            }
            const resp = await AthleteService.getOne(id ? id : "");
            if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
                throw new Error("");
            }

            const athleteObj = resp?.data;

            athleteObj.createdBy = athleteObj?.createdBy?.firstName || "";
            athleteObj.modifiedBy = athleteObj?.modifiedBy?.firstName || "";

            if (athleteObj?.athleteAge) {
                athleteObj.dob = format(athleteObj?.athleteAge, 'dd-MM-yyyy');
                athleteObj.athleteAge = differenceInYears(new Date(), athleteObj?.athleteAge);
            }

            setAthlete(athleteObj);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const socials = [
        { key: "instagram", name: "Instagram", icon: <InstagramLogoIcon /> },
        { key: "facebook", name: "Facebook", icon: <FacebookIcon /> },
        { key: "twitter", name: "Twitter", icon: <TwitterLogoIcon /> },
        { key: "linkedin", name: "Linkedin", icon: <LinkedInLogoIcon /> },
        { key: "youtube", name: "You Tube", icon: <YoutubeIcon /> },
        { key: "website", name: "Website", icon: <Globe /> },
    ];

    const handleCopy = (key: string) => {
        if (athlete[key]) {
            navigator.clipboard
                .writeText(athlete[key])
                .then(() => {
                    toast.success("Copied");
                })
                .catch((err) => {
                    toast.error("Unable to copy.");
                });
        } else {
            toast.error("Unable to copy.");
        }
    };

    return (
        <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 my-8 ">
            <div className="mx-auto grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4 mb-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Athlete
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        {userRole === "SUPER_ADMIN" ?
                            <Button size="sm"
                                onClick={() => navigate(`${NAVIGATION_ROUTES.EDIT_ATHLETE}/${id}`)}
                            >
                                <Pencil className="w-4 h-4" />{" "}
                            </Button>
                            : null}
                    </div>
                </div>
                {isLoading ? (
                    <FormSkeleton />
                ) : (<>
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <div className=" m-3">
                                    <ul className="grid gap-3">
                                        <li className="flex items-center ">
                                            <span className="w-1/2">Name</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.name || "-"}
                                            </span>
                                        </li>
                                        <li className="flex ">
                                            <span className="w-1/2">Sports</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.sport?.name || "-"}
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <span className="w-1/2">Nationality</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.nationality?.name || "-"}
                                            </span>
                                        </li>
                                        <li className="flex ">
                                            <span className="w-1/2">State</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.state?.name || "-"}
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <span className="w-1/2">Agency</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.agency?.name || "-"}
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <span className="w-1/2">Status</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.status?.name || "-"}
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <span className="w-1/2">DOB</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.dob || "-"}
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <span className="w-1/2">Age</span>
                                            <span className="text-muted-foreground">
                                                {athlete?.athleteAge || "-"}
                                            </span>
                                        </li>
                                        <li className="flex items-center ">
                                            <span className="w-1/2">Gender</span>
                                            {athlete?.gender?.map(
                                                (gender: nameAndId, i: number) => (
                                                    <span className="text-muted-foreground">
                                                        {gender?.name || "-"}
                                                    </span>
                                                )
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </Card>

                            <Socials data={athlete} />

                            <Marketing data={athlete} />

                            <Association data={athlete} />
                        </div>
                        <Attributes
                            data={athlete}
                            title={"Athlete"}
                        />
                    </div>
                    <div>
                        <div className="space-y-4 ">
                            <Activation data={athlete} />
                            <SportsDealSummary data={athlete} />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                            <ContactPerson data={athlete} />
                        </div>
                    </div>
                </>)}
            </div>
        </div>
    );
}

export default AthleteView;
