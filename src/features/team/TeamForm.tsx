import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { DatePicker } from "../../components/date/DatePicker";
import { FormItemWrapper } from "../../components/form/item-wrapper";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Form, FormField } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SelectBox from "../../components/ui/multi-select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { getMetadata } from "../utils/metadataUtils";
import {
    TEAM_METADATA,
    teamFormSchema,
    TTeamFormSchema,
} from "./constants/metadata";

export function TeamForm() {
    const form = useForm<TTeamFormSchema>({
        resolver: zodResolver(teamFormSchema),
    });
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);

    const onSubmit = (data: TTeamFormSchema) => {
        console.log("\n\nForm data:", data);
    };

    const [_isLoading, setIsLoading] = useState<boolean>(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsLoading(true);
                await getMetadata(
                    metadataStore,
                    setMetadataStore,
                    TEAM_METADATA
                );
            } catch (error) {
                console.error(error);
                const unknownError = ErrorService.handleCommonErrors(
                    error,
                    logout,
                    navigate
                );
                if (unknownError) {
                    toast.error("An unknown error occurred");
                    navigate(NAVIGATION_ROUTES.DASHBOARD);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    if (!metadataStore) {
        return <div>Loading...</div>;
    }

    const teamAttributes = [
        {
            title: "Sports",
            register: "sportId",
            options: metadataStore.sport,
        },
        {
            title: "League",
            register: "leagueId",
            options: metadataStore.league,
        },
        {
            title: "Owners",
            register: "teamOwnerIds",
            options: metadataStore.teamOwner,
        },
        {
            title: "City",
            register: "hqCityId",
            options: metadataStore.city,
        },
        {
            title: "State",
            register: "hqStateId",
            options: metadataStore.state,
        },
        {
            title: "Personality Traits",
            register: "personalityTraitIds",
            options: metadataStore.personalityTrait,
        },
        {
            title: "Tier",
            register: "tierIds",
            options: metadataStore.tier,
        },
    ];

    return (
        <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto grid flex-1 auto-rows-max gap-4"
                >
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                                navigate(NAVIGATION_ROUTES.TEAM_LIST, {
                                    replace: true,
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create Team
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                            >
                                Discard
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                            >
                                Save Team
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Team Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6  ">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="teamName"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Team Name">
                                                        <Input {...field} />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="taglineIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Taglines">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.tagline
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a tagline"
                                                            inputPlaceholder="Search for a tagline..."
                                                            emptyPlaceholder="No tagline found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="strategyOverview"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Strategy Overview">
                                                        <Textarea
                                                            id="strategyOverview"
                                                            {...field}
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="yearOfInception"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Year of inception">
                                                            <DatePicker
                                                                placeholder="Year"
                                                                {...field}
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="franchiseFee"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Franchise fees (in cr)">
                                                            <Input
                                                                {...field}
                                                                placeholder="Franchise fees"
                                                                type="number"
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="activeCampaignIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Active Campaigns">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.activeCampaign
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a campaign"
                                                                inputPlaceholder="Search for a campaigns..."
                                                                emptyPlaceholder="No campaign found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="associationCost"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Association Cost (in cr)">
                                                            <Input
                                                                {...field}
                                                                placeholder="Association cost"
                                                                type="number"
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="activeCampaignIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Active Campaigns">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.activeCampaign
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a campaign"
                                                            inputPlaceholder="Search for a campaigns..."
                                                            emptyPlaceholder="No campaign found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="nccsIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="NCCS class">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.nccs
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a nccs class"
                                                            inputPlaceholder="Search for a nccs class..."
                                                            emptyPlaceholder="No nccs class found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card x-chunk="dashboard-07-chunk-0 w-full">
                                <CardHeader>
                                    <CardTitle>Marketing</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6  ">
                                        <div className="grid gap-3 grid-cols-2">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="marketingPlatformPrimaryIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Primary Marketing Platform">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.marketingPlatform
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a platform"
                                                                inputPlaceholder="Search for a platform..."
                                                                emptyPlaceholder="No platform found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="marketingPlatformSecondaryIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Secondary Marketing Platform">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.marketingPlatform
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a platform"
                                                                inputPlaceholder="Search for a platform..."
                                                                emptyPlaceholder="No platform found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-3 grid-cols-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="primaryMarketIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Primary key Market">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.keyMarket
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a market"
                                                                inputPlaceholder="Search for a market..."
                                                                emptyPlaceholder="No market found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="secondaryMarketIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Secondary key Market">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.keyMarket
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a market"
                                                                inputPlaceholder="Search for a market..."
                                                                emptyPlaceholder="No market found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="tertiaryIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Tertiary Market">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.state
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a state"
                                                                inputPlaceholder="Search for a state..."
                                                                emptyPlaceholder="No state found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Viewership</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="">
                                                    Year
                                                </TableHead>
                                                <TableHead>
                                                    Viewership
                                                </TableHead>
                                                <TableHead>Reach</TableHead>
                                                <TableHead className="">
                                                    Viewship Type
                                                </TableHead>
                                                <TableHead className=""></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        {/* <TableBody>
                                            {metrics.map((metric, index) => (
                                                <MatricsForm
                                                    register={register}
                                                    control={control}
                                                    index={index}
                                                    metric={metric}
                                                    onChange={(updatedMetric) =>
                                                        handleUpdateMetric(
                                                            index,
                                                            updatedMetric
                                                        )
                                                    }
                                                    onRemove={() =>
                                                        handleRemoveMetric(
                                                            index
                                                        )
                                                    }
                                                />
                                            ))}
                                            <ErrorMsg
                                                msg=" Valid viewership required"
                                                show={!!errors?.matrics}
                                            />
                                        </TableBody> */}
                                    </Table>

                                    {/* <div className="flex justify-end mt-4">
                                        <Button
                                            onClick={handleAddMetric}
                                            size="sm"
                                            className="h-7 gap-1"
                                        >
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Add
                                            </span>
                                        </Button>
                                    </div> */}
                                </CardContent>
                            </Card>

                            <Card x-chunk="dashboard-07-chunk-1">
                                <CardHeader>
                                    <CardTitle>Socials</CardTitle>
                                    <CardDescription>
                                        {/* Lipsum dolor sit amet, consectetur adipiscing elit */}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">
                                                    Platforms
                                                </TableHead>
                                                <TableHead>Link</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    Instagram
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="instagram"
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    Facebook
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="facebook"
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    Linkedin
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="linkedin"
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    Twitter
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="twitter"
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    You Tube
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="youtube"
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    Website
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name="website"
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 ">
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Team Attributes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        {teamAttributes?.map(
                                            (attribute, index) => (
                                                <div
                                                    className="grid gap-3"
                                                    key={index}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name={
                                                            attribute.register as keyof TTeamFormSchema
                                                        }
                                                        render={({ field }) => (
                                                            <FormItemWrapper
                                                                label={
                                                                    attribute.title
                                                                }
                                                            >
                                                                <SelectBox
                                                                    options={
                                                                        attribute.options
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={
                                                                        field.onChange
                                                                    }
                                                                    placeholder={`Select a ${attribute.title.toLowerCase()}`}
                                                                    inputPlaceholder={`Search for a ${attribute.title.toLowerCase()}...`}
                                                                    emptyPlaceholder={`No ${attribute.title.toLowerCase()} found`}
                                                                    multiple
                                                                />
                                                            </FormItemWrapper>
                                                        )}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Target Audience</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="age"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Age">
                                                        <Input
                                                            {...field}
                                                            placeholder="Age"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="genderIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Gender">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.gender
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a gender"
                                                            inputPlaceholder="Search for a gender..."
                                                            emptyPlaceholder="No gender found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button
                            variant="outline"
                            size="sm"
                        >
                            Discard
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                        >
                            Save Team
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default TeamForm;
