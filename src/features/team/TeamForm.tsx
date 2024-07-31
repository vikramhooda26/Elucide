import { ChevronLeft, PlusCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useEffect, useReducer, useState } from "react";
import { DatePicker } from "../../components/date/DatePicker";
import CutomSelect from "../../components/selector/CustomSelect";
import CustomSelectWithSearch from "../../components/selector/CustomSelectWithSearch";
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
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { itemType } from "../../types/components/SelectorTypes";
import { Action, MetricType, State } from "../../types/team/TeamFormTypes";
import MatricsForm from "./components/MatricsForm";
import { useRecoilState } from "recoil";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { TEAM_METADATA } from "./constants/metadata";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getMetadata } from "../utils/metadataUtils";
import AjaxService from "../../services/AjaxService";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import { toast } from "sonner";

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
    const [selectorState, dispatchSelect] = useReducer(
        selectorReducer,
        initialSelectorState
    );
    const [metrics, setMetrics] = useState<MetricType[]>([
        { viewership: "", reach: "", year: "", viewshipType: "" },
    ]);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);

    const teamAttributes = [
        {
            title: "Sports",
        },
        {
            title: "League",
        },
        {
            title: "Owners",
        },
        {
            title: "City",
        },
        {
            title: "State",
        },
        {
            title: "Personality Traits",
        },
        {
            title: "Tier",
        },
    ];

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
                const unknownError = AjaxService.handleCommonErrors(
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
        setMetrics(updatedMetrics);
    };

    return (
        <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid flex-1 auto-rows-max gap-4">
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
                        <Button size="sm">Save Team</Button>
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
                                            defaultValue="Gamer Gear Pro Controller"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <CutomSelect
                                            selectorContent={{
                                                selectorContent: {
                                                    title: "Tag Lines",
                                                    items: taglines,
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="strategyOverview">
                                            Strategy Overview
                                        </Label>
                                        <Textarea id="strategyOverview" />
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                                        <div className="grid gap-3">
                                            <Label htmlFor="yearOfInception">
                                                Year Of Inception
                                            </Label>
                                            <DatePicker placeholder={"Year"} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="top-p">
                                                Franchise Fee
                                            </Label>
                                            <Input
                                                id="top-p"
                                                type="number"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="top-a">
                                                Association
                                            </Label>
                                            <Input id="top-a" />
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <CustomSelectWithSearch
                                            selectorContent={{
                                                selectorContent:
                                                    activeCampaignsData,
                                            }}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <CustomSelectWithSearch
                                            selectorContent={{
                                                selectorContent: incomedata,
                                            }}
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
                                            <CutomSelect
                                                selectorContent={{
                                                    selectorContent: {
                                                        title: "Main Platforms",
                                                        items: primaryMarketingPlatform,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <CutomSelect
                                                selectorContent={{
                                                    selectorContent: {
                                                        title: "Sub Platforms",
                                                        items: primaryMarketingPlatform,
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3 grid-cols-3">
                                        <div className="grid gap-3">
                                            <CutomSelect
                                                selectorContent={{
                                                    selectorContent: {
                                                        title: "Primary Markets",
                                                        items: marketing,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <CutomSelect
                                                selectorContent={{
                                                    selectorContent: {
                                                        title: "Secondary Markets",
                                                        items: marketing,
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <CutomSelect
                                                selectorContent={{
                                                    selectorContent: {
                                                        title: "Tertiary Markets",
                                                        items: marketing,
                                                    },
                                                }}
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
                                                <Label
                                                    htmlFor="stock-1"
                                                    className="sr-only"
                                                >
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-1"
                                                    type="text"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Facebook
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    htmlFor="stock-2"
                                                    className="sr-only"
                                                >
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-2"
                                                    type="text"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Linkedin
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    htmlFor="stock-3"
                                                    className="sr-only"
                                                >
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-3"
                                                    type="text"
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                You Tube
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    htmlFor="stock-3"
                                                    className="sr-only"
                                                >
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-3"
                                                    type="text"
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                Website
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    htmlFor="stock-3"
                                                    className="sr-only"
                                                >
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-3"
                                                    type="text"
                                                />
                                            </TableCell>
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
                                            <Select>
                                                <SelectTrigger
                                                    id={d?.title?.toLowerCase()}
                                                    aria-label="Select status"
                                                >
                                                    <SelectValue
                                                        placeholder={`Select ${d?.title?.toLowerCase()}`}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">
                                                        Draft
                                                    </SelectItem>
                                                    <SelectItem value="published">
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem value="archived">
                                                        Archived
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
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
                    <Button size="sm">Save Team</Button>
                </div>
            </div>
        </div>
    );
}

export default TeamForm;
