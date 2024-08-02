import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { DatePicker } from "../../components/date/DatePicker";
import ReactSelect from "../../components/selector/ReactSelect";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
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
import { itemType } from "../../types/components/SelectorTypes";
import { Action, MetricType, State } from "../../types/team/TeamFormTypes";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { getMetadata } from "../utils/metadataUtils";
import MatricsForm from "./components/MatricsForm";
import { TEAM_METADATA, teamFormSchema } from "./constants/metadata";
import ErrorMsg from '../../components/error/ErrorMsg';

const initialSelectorState: State = {
    selectedCampaign: [],
    selectedIncomes: [],
};

const selectorReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_SELECTED_CAMPAIGN":
            return { ...state, selectedCampaign: action.payload };
        case "SET_SELECTED_INCOMES":
            return { ...state, selectedIncomes: action.payload };
        default:
            return state;
    }
};

export function TeamForm() {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(teamFormSchema) });

    const [selectorState, dispatchSelect] = useReducer(
        selectorReducer,
        initialSelectorState
    );
    const [metrics, setMetrics] = useState<MetricType[]>([
        { viewership: "", reach: "", year: "", viewshipType: "" },
    ]);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    console.log('metadataStore -=- ', metadataStore);

    const onSubmit = (data: any) => {
        // use form data.
        console.log('data -=- ', data);
    }

    const taglines: itemType[] = metadataStore?.tagline
        ? metadataStore?.tagline.map((line) => ({
            label: line.name,
            value: line.id,
        }))
        : [];

    const activeCampaigns: itemType[] = metadataStore?.activeCampaign
        ? metadataStore?.activeCampaign.map((campaign) => ({
            label: campaign.name,
            value: campaign.id,
        }))
        : [];

    const primaryMarketingPlatform: itemType[] = metadataStore?.keyMarkets
        ? metadataStore?.keyMarkets.map((market) => ({
            label: market.zone,
            value: market.id,
        }))
        : [];

    const marketing: itemType[] = metadataStore?.marketingPlatform
        ? metadataStore?.marketingPlatform.map((platform) => ({
            label: platform.name,
            value: platform.id,
        }))
        : [];

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

    const searchCallback = (searchFrom: string, searchValue: string) => {
        if (searchFrom === "activeCampaigns") {
            console.log("searchValue -=- ", searchValue);
        }
    };

    const setSelectedCampaign = (campaigns: string[]) => {
        dispatchSelect({ type: "SET_SELECTED_CAMPAIGN", payload: campaigns });
    };

    const setSelectedIncomes = (incomes: string[]) => {
        dispatchSelect({ type: "SET_SELECTED_INCOMES", payload: incomes });
    };

    const activeCampaignsData = {
        title: "Active Campaigns",
        items: activeCampaigns,
        isMultiple: true,
        isSearchable: true,
        isClearable: true,
        searchCallback: searchCallback,
        selectState: selectorState.selectedCampaign,
        onChange: setSelectedCampaign,
        searchFrom: "activeCampaigns",
    };

    const incomedata = {
        title: "Incomes",
        items: activeCampaigns,
        isMultiple: true,
        isSearchable: true,
        isClearable: true,
        searchCallback: searchCallback,
        selectState: selectorState.selectedIncomes,
        onChange: setSelectedIncomes,
        searchFrom: "incomes",
    };

    const handleAddMetric = () => {
        setMetrics([
            ...metrics,
            { viewership: "", reach: "", year: "", viewshipType: "" },
        ]);
    };

    const handleUpdateMetric = (index: number, updatedMetric: MetricType) => {
        const updatedMetrics = metrics.map((metric, idx) =>
            idx === index ? updatedMetric : metric
        );
        setMetrics(updatedMetrics);
    };

    const handleRemoveMetric = (index: number) => {
        const updatedMetrics = metrics.filter((_, idx) => idx !== index);
        setValue(`metrics.${index}`, updatedMetrics);
        setMetrics(updatedMetrics);
    };

    const selectArr = [
        { label: "Draft", value: 'draft' },
        { label: "Active", value: 'active' },
        { label: "Archived", value: 'archived' },
    ];

    const teamAttributes = [
        {
            title: "Sports",
            register: "sportId",
            options: metadataStore?.sport,
        },
        {
            title: "League",
            register: "leagueId",
            options: metadataStore?.league,
        },
        {
            title: "Owners",
            register: "teamOwnerIds",
            options: metadataStore?.teamOwner,
        },
        {
            title: "City",
            register: "hqCityId",
            options: metadataStore?.city,
        },
        {
            title: "State",
            register: "hqStateId",
            options: metadataStore?.state,
        },
        {
            title: "Personality Traits",
            register: "personalityTraitIds",
            options: metadataStore?.personalityTrait,
        },
        {
            title: "Tier",
            register: "tierIds",
            options: metadataStore?.tier,
        },
    ];
    console.log('error -=- ', errors);

    return (
        <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"

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
                        <Button onSubmit={handleSubmit(onSubmit)} type='submit' size="sm">Save Team</Button>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Team Details</CardTitle>
                                {/* <CardDescription>
                                    Lipsum dolor sit amet, consectetur
                                    adipiscing elit
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6  ">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            {...register('teamName')}
                                        />
                                        <ErrorMsg msg="Team name required" show={!!errors?.teamName} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label >Tag Lines</Label>
                                        <Controller
                                            name={'taglineIds'}
                                            control={control}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    field={field}
                                                    selectArr={metadataStore?.tagline}
                                                />
                                            )}
                                        />
                                        <ErrorMsg msg="Tag lines required" show={!!errors?.taglineIds} />

                                        <Label htmlFor="strategyOverview">
                                            Strategy Overview
                                        </Label>
                                        <Textarea {...register('strategyOverview')} id="strategyOverview" />
                                        <ErrorMsg msg=" Strategy Overview required" show={!!errors?.strategyOverview} />
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div className="grid gap-3">
                                            <Label htmlFor="yearOfInception">
                                                Year Of Inception
                                            </Label>
                                            <DatePicker  {...register('yearOfInception')} placeholder={"Year"} />
                                            <ErrorMsg msg=" Year Of Inception required" show={!!errors?.yearOfInception} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="franchise">
                                                Franchise Fee
                                            </Label>
                                            <Input
                                                id='franchise'
                                                {...register('franchiseFee')}
                                                type="number"
                                            />
                                            <ErrorMsg msg=" Franchise Fee required" show={!!errors?.franchiseFee} />
                                        </div>

                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div className="grid gap-3">
                                            <Label >Association</Label>
                                            <Controller
                                                name={'associationLevelId'}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={metadataStore?.activeCampaign}
                                                    />
                                                )}
                                            />
                                            <ErrorMsg msg=" Valid association required" show={!!errors?.associationLevelId} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="associationCost">
                                                Association Cost (in cr)
                                            </Label>
                                            <Input
                                                id='associationCost'
                                                {...register('associationCost')}
                                                type="number"
                                            />
                                            <ErrorMsg msg=" Valid association cost required" show={!!errors?.associationCost} />
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label >Active Campaigns</Label>
                                        <Controller
                                            name={'activeCampaignIds'}
                                            control={control}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    field={field}
                                                    selectArr={metadataStore?.activeCampaign}
                                                />
                                            )}
                                        />
                                        <ErrorMsg msg=" Valid active campaigns required" show={!!errors?.activeCampaignIds} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label >NCCS</Label>
                                        <Controller
                                            name={'nccsIds'}
                                            control={control}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    field={field}
                                                    selectArr={metadataStore?.nccs}
                                                />
                                            )}
                                        />
                                        <ErrorMsg msg=" Valid nccs required" show={!!errors?.nccsIds} />
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
                                            <Label >Main Platforms</Label>
                                            <Controller
                                                name={'marketingPlatformPrimaryIds'}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={metadataStore?.marketingPlatform}
                                                    />
                                                )}
                                            />
                                            <ErrorMsg msg=" Valid marketing main platforms required" show={!!errors?.marketingPlatformPrimaryIds} />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label >Sub Platforms</Label>
                                            <Controller
                                                name={'marketingPlatformSecondaryIds'}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={metadataStore?.marketingPlatform}
                                                    />
                                                )}
                                            />
                                            <ErrorMsg msg=" Valid marketing sub platforms required" show={!!errors?.marketingPlatformSecondaryIds} />
                                        </div>
                                    </div>
                                    <div className="grid gap-3 grid-cols-3">

                                        <div className="grid gap-3">
                                            <Label >Primary Markets</Label>
                                            <Controller
                                                name={'primaryMarketIds'}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={metadataStore?.keyMarket}
                                                    />
                                                )}
                                            />
                                            <ErrorMsg msg=" Valid primary markets required" show={!!errors?.primaryMarketIds} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label >Secondary Markets</Label>
                                            <Controller
                                                name={'secondaryMarketIds'}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={metadataStore?.keyMarket}
                                                    />
                                                )}
                                            />
                                            <ErrorMsg msg=" Valid secondary markets required" show={!!errors?.secondaryMarketIds} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label >Tertiary Markets</Label>
                                            <Controller
                                                name={'tertiaryIds'}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={metadataStore?.tertiary}
                                                    />
                                                )}
                                            />
                                            <ErrorMsg msg=" Valid tertiary markets required" show={!!errors?.tertiaryIds} />
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
                                            <TableHead>Viewership</TableHead>
                                            <TableHead>Reach</TableHead>
                                            <TableHead className="">
                                                Viewship Type
                                            </TableHead>
                                            <TableHead className=""></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
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
                                                    handleRemoveMetric(index)
                                                }
                                            />
                                        ))}
                                        <ErrorMsg msg=" Valid viewership required" show={!!errors?.matrics} />
                                    </TableBody>
                                </Table>

                                <div className="flex justify-end mt-4">
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
                                </div>
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
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    {...register('instagram')}
                                                />

                                            </TableCell>
                                            <ErrorMsg msg="Instagram link is required" show={!!errors?.instagram} />
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Facebook
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    {...register('facebook')}
                                                />

                                            </TableCell>
                                            <ErrorMsg msg="Facebook link is required" show={!!errors?.facebook} />
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Linkedin
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    {...register('linkedin')}
                                                />

                                            </TableCell>
                                            <ErrorMsg msg="Linkedin link is required" show={!!errors?.linkedin} />
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Twitter
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    {...register('twitter')}
                                                />

                                            </TableCell>
                                            <ErrorMsg msg="Twitter link is required" show={!!errors?.twitter} />
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                You Tube
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    {...register('youtube')}
                                                />
                                            </TableCell>
                                            <ErrorMsg msg="You Tube link is required" show={!!errors?.youtube} />
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Website
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    {...register('website')}
                                                />
                                            </TableCell>
                                            <ErrorMsg msg="Website link is required" show={!!errors?.website} />
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
                                    {teamAttributes?.map((d, i: number) => (
                                        <div
                                            className="grid gap-3"
                                            key={i}
                                        >
                                            <Label
                                                htmlFor={d?.title?.toLowerCase()}
                                            >
                                                {d?.title}
                                            </Label>
                                            <Controller
                                                name={d?.register}
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactSelect
                                                        field={field}
                                                        selectArr={taglines}
                                                    />

                                                )}
                                            />
                                            <ErrorMsg msg={`Valid ${d?.title?.toLowerCase()} required`} show={!!errors?.[d?.register]} />
                                        </div>
                                    ))}
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
                                        <Label> Age</Label>
                                        <Controller
                                            name={'ageIds'}
                                            control={control}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    field={field}
                                                    selectArr={metadataStore?.age}
                                                />
                                            )}
                                        />
                                        <ErrorMsg msg="Valid ages required" show={!!errors?.ageIds} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label> Gender</Label>
                                        <Controller
                                            name={'genderIds'}
                                            control={control}
                                            render={({ field }) => (
                                                <ReactSelect
                                                    field={field}
                                                    selectArr={metadataStore?.gender}
                                                />
                                            )}
                                        />
                                        <ErrorMsg msg="Valid genders required" show={!!errors?.genderIds} />
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
                    <Button onSubmit={handleSubmit(onSubmit)} type='submit' size="sm">Save Team</Button>
                </div>
            </form>
        </div>
    );
}

export default TeamForm;
