import { CardWrapper } from "@/components/card/card-wrapper";
import AssociationCard from "@/components/core/form/association-card";
import ContactPersonCard from "@/components/core/form/contact-person-card";
import { EndorsementCard } from "@/components/core/form/endorsement-card";
import { FormSkeleton } from "@/components/core/form/form-skeleton";
import { MetricsCard } from "@/components/core/form/metrics.card";
import { TDisplayFields, VerticalFieldsCard } from "@/components/core/form/vertical-fields-card";
import { InputDrawer } from "@/components/form/input-drawer";
import { FormItemWrapper } from "@/components/form/item-wrapper";
import Loader from "@/components/Loader";
import { getPhoneData } from "@/components/phone-input";
import { TableHeaderWrapper } from "@/components/table/table-header-wrapper";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectBox from "@/components/ui/multi-select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "@/lib/constants";
import ErrorService from "@/services/error/ErrorService";
import LeagueService from "@/services/features/LeagueService";
import MetadataService from "@/services/features/MetadataService";
import { metadataStoreAtom } from "@/store/atoms/metadata";
import { userAtom } from "@/store/atoms/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { activeCampaignFormSchema } from "../metadata/ActiveCampaign/constants/metadata";
import { broadcastPartnerFormSchema } from "../metadata/broadcast-partner/constants/metadata";
import { leagueOwnerFormSchema } from "../metadata/league-owner/constants/metadata";
import { ottPartnerFormSchema } from "../metadata/ott-partner/constants/metadata";
import { sportFormSchema } from "../metadata/sport/constants/metadata";
import { taglineFormSchema } from "../metadata/tagline/constants/metadata";
import {
  convertCroreToRupees,
  convertRupeesToCrore,
  getListOfYears,
  validateEndorsements,
  validateMetrics
} from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import { LEAGUE_METADATA, leagueFormSchema, TEditLeagueFormSchema, TLeagueFormSchema } from "./constants.ts/metadata";

function LeagueForm() {
  const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
  const [isFetchingMetadata, setIsFetchingMetadata] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
  const [leagueData, setLeaguesData] = useState<TEditLeagueFormSchema>();
  const user = useRecoilValue(userAtom);
  const { id } = useParams();
  const initialFormData = useRef<TLeagueFormSchema | null>(null);

  const emptyFormValues: Partial<TLeagueFormSchema> = {
    userId: user?.id,
    name: "",
    taglineIds: [],
    strategyOverview: "",
    association: [],
    yearOfInception: "",
    activeCampaignIds: [],
    primaryMarketingPlatformIds: [],
    secondaryMarketingPlatformIds: [],
    primaryMarketIds: [],
    secondaryMarketIds: [],
    tertiaryIds: [],
    broadcastPartnerMetrics: [],
    ottPartnerMetrics: [],
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    website: "",
    youtube: "",
    contactPerson: [],
    sportId: undefined,
    formatId: undefined,
    ownerIds: [],
    nccsIds: [],
    endorsements: [],
    subPersonalityTraitIds: [],
    tierIds: [],
    broadCastPartnerId: undefined,
    ottPartnerId: undefined,
    ageIds: [],
    genderIds: []
  };

  const form = useForm<TLeagueFormSchema>({
    resolver: zodResolver(leagueFormSchema),
    defaultValues: {
      userId: user?.id
    }
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchMetadata = async () => {
    try {
      setIsFetchingMetadata(true);
      await getMetadata(metadataStore, setMetadataStore, LEAGUE_METADATA);
    } catch (error) {
      console.error(error);
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError) {
        toast.error("An unknown error occurred");
        navigate(NAVIGATION_ROUTES.DASHBOARD);
      }
    } finally {
      setIsFetchingMetadata(false);
    }
  };

  const ottPartnerMetricFieldArray = useFieldArray({
    name: "ottPartnerMetrics",
    control: form.control
  });

  const broadcastPartnerMetricFieldArray = useFieldArray({
    name: "broadcastPartnerMetrics",
    control: form.control
  });

  const populateForm = (leagueData: TEditLeagueFormSchema) => {
    const formData: TLeagueFormSchema = {
      name: leagueData.name || "",
      userId: user?.id || "",
      taglineIds: (leagueData.taglines?.map((tagline) => tagline.id).filter(Boolean) as string[]) || [],
      strategyOverview: leagueData.strategyOverview || "",
      association:
        leagueData.association?.map((asso) => ({
          associationId: asso.associationId,
          associationLevelId: asso.associationLevel?.id,
          costOfAssociation: convertRupeesToCrore(asso?.costOfAssociation) || undefined
        })) || [],
      yearOfInception: leagueData.yearOfInception || "",
      activeCampaignIds: (leagueData.activeCampaigns?.map((campaign) => campaign.id).filter(Boolean) as string[]) || [],
      primaryMarketingPlatformIds:
        (leagueData.primaryMarketingPlatform?.map((platform) => platform.id).filter(Boolean) as string[]) || [],
      secondaryMarketingPlatformIds:
        (leagueData.secondaryMarketingPlatform?.map((platform) => platform.id).filter(Boolean) as string[]) || [],
      primaryMarketIds: (leagueData.primaryKeyMarket?.map((market) => market.id).filter(Boolean) as string[]) || [],
      secondaryMarketIds: (leagueData.secondaryKeyMarket?.map((market) => market.id).filter(Boolean) as string[]) || [],
      tertiaryIds: (leagueData.tertiary?.map((tertiaries) => tertiaries.id).filter(Boolean) as string[]) || [],
      broadcastPartnerMetrics:
        leagueData.broadcastPartnerMetrics?.map((metric) => ({
          reach: metric.reach || "",
          viewership: metric.viewership || "",
          year: metric.year || "",
          broadcastPartnerId: metric.broadcastPartner.id || ""
        })) || [],
      ottPartnerMetrics:
        leagueData.ottPartnerMetrics?.map((metric) => ({
          reach: metric.reach || "",
          viewership: metric.viewership || "",
          year: metric.year || "",
          ottPartnerId: metric.ottPartner.id || ""
        })) || [],
      instagram: leagueData?.instagram || "",
      facebook: leagueData?.facebook || "",
      twitter: leagueData?.twitter || "",
      linkedin: leagueData?.linkedin || "",
      website: leagueData?.website || "",
      youtube: leagueData?.youtube || "",
      contactPerson:
        leagueData.contactPersons?.map((details) => ({
          contactId: details.contactId || undefined,
          contactName: details.contactName || "",
          contactEmail: details.contactEmail || "",
          contactLinkedin: details.contactLinkedin || "",
          contactDesignation: details.contactDesignation || "",
          contactNumber: details.contactNumber || ""
        })) || [],
      sportId: leagueData.sport?.id,
      formatId: leagueData.format?.id,
      ownerIds: (leagueData.owners?.map((owner) => owner.id).filter(Boolean) as string[]) || [],
      nccsIds: (leagueData.nccs?.map((nccs) => nccs.id).filter(Boolean) as string[]) || [],
      endorsements:
        leagueData.endorsements?.map((endorse) => ({
          name: endorse.name || "",
          active: endorse.active || false
        })) || [],
      subPersonalityTraitIds:
        (leagueData.mainPersonalityTraits
          ?.map((traits) => traits.subPersonalityTraits?.map((sub) => sub.id || []))
          .flat(2)
          .filter(Boolean) as string[]) || [],
      tierIds: leagueData.tiers?.filter((tier) => tier.id !== undefined).map((tier) => tier.id as string) || [],
      broadCastPartnerId: leagueData.broadcastPartner?.id,
      ottPartnerId: leagueData.ottPartner?.id,
      ageIds: (leagueData.age?.map((age) => age.id).filter(Boolean) as string[]) || [],
      genderIds: (leagueData.gender?.map((gender) => gender.id).filter(Boolean) as string[]) || []
    };

    initialFormData.current = formData;
    form.reset(formData);
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    const fetchLeagueDetails = async (id: string) => {
      try {
        setIsFetchingDetails(true);

        const response = await LeagueService.getOne(id);

        if (response.status === HTTP_STATUS_CODES.OK) {
          populateForm(response.data);
          setLeaguesData(response.data);
        }
      } catch (error) {
        console.error(error);
        const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
        if (unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND) {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsFetchingDetails(false);
      }
    };

    if (id) {
      if (!leagueData || !leagueData.name) {
        fetchLeagueDetails(id);
      } else {
        populateForm(leagueData);
      }
    }
  }, [id, leagueData]);

  useEffect(() => {
    if (isSubmitting) {
      form.control._disableForm(true);
    } else {
      form.control._disableForm(false);
    }
  }, [isSubmitting]);

  if (!metadataStore) {
    return <div>loading...</div>;
  }

  const defaultOttPartnerMetric = {
    ottPartnerId: "",
    year: "",
    viewership: "",
    reach: ""
  };

  const defaultBroadcastPartnerMetric = {
    broadcastPartnerId: "",
    year: "",
    viewership: "",
    reach: ""
  };

  const leagueAttributes: TDisplayFields<TLeagueFormSchema>[] = [
    {
      title: "Sport",
      register: "sportId",
      options: metadataStore.sport,
      multiple: false,
      showAddButton: true,
      createFn: MetadataService.createSport,
      fetchMetadataFn: fetchMetadata,
      drawerRegister: "sportName",
      schema: sportFormSchema,
      type: "DROPDOWN",
      accessLevel: ["ADMIN", "SUPER_ADMIN", "STAFF"]
    },
    {
      title: "Format",
      register: "formatId",
      options: metadataStore.format,
      multiple: false,
      showAddButton: false,
      type: "DROPDOWN"
    },
    {
      title: "Owners",
      register: "ownerIds",
      options: metadataStore.leagueOwner,
      multiple: true,
      showAddButton: true,
      createFn: MetadataService.createLeagueOwner,
      fetchMetadataFn: fetchMetadata,
      drawerRegister: "leagueOwnerName",
      schema: leagueOwnerFormSchema,
      type: "DROPDOWN",
      accessLevel: ["ADMIN", "SUPER_ADMIN", "STAFF"]
    },
    {
      title: "NCCS Class",
      register: "nccsIds",
      options: metadataStore.nccs,
      multiple: true,
      showAddButton: false,
      type: "DROPDOWN"
    },
    {
      title: "Personality Traits",
      register: "subPersonalityTraitIds",
      options: metadataStore.personalityTrait,
      multiple: true,
      showAddButton: false,
      type: "DROPDOWN"
    },
    {
      title: "Tiers",
      register: "tierIds",
      options: metadataStore.tier,
      multiple: true,
      showAddButton: false,
      type: "DROPDOWN"
    }
  ];

  const partnerships: TDisplayFields<TLeagueFormSchema>[] = [
    {
      title: "Broadcast Partner",
      register: "broadCastPartnerId",
      options: metadataStore.broadcastPartner,
      multiple: false,
      type: "DROPDOWN",
      showAddButton: true,
      createFn: MetadataService.createBroadcastPartner,
      fetchMetadataFn: fetchMetadata,
      drawerRegister: "broadcastPartnerName",
      schema: broadcastPartnerFormSchema,
      accessLevel: ["ADMIN", "SUPER_ADMIN", "STAFF"]
    },
    {
      title: "OTT Partner",
      register: "ottPartnerId",
      options: metadataStore.ottPartner,
      multiple: false,
      type: "DROPDOWN",
      showAddButton: true,
      createFn: MetadataService.createOttPartner,
      fetchMetadataFn: fetchMetadata,
      drawerRegister: "ottPartnerName",
      schema: ottPartnerFormSchema,
      accessLevel: ["ADMIN", "SUPER_ADMIN", "STAFF"]
    }
  ];

  const targetAudience: {
    title: string;
    register: Extract<keyof TLeagueFormSchema, "ageIds" | "genderIds">;
    options: any;
    multiple: boolean;
    type: "DROPDOWN";
  }[] = [
    {
      title: "Age",
      register: "ageIds",
      options: metadataStore.age,
      multiple: true,
      type: "DROPDOWN"
    },
    {
      title: "Gender",
      register: "genderIds",
      options: metadataStore.gender,
      multiple: true,
      type: "DROPDOWN"
    }
  ];

  const socials: {
    name: Extract<keyof TLeagueFormSchema, "instagram" | "facebook" | "linkedin" | "youtube" | "website" | "twitter">;
  }[] = [
    {
      name: "instagram"
    },
    {
      name: "facebook"
    },
    {
      name: "twitter"
    },
    {
      name: "linkedin"
    },
    {
      name: "youtube"
    },
    {
      name: "website"
    }
  ];

  const handleDiscard = () => {
    if (id && initialFormData.current) {
      form.reset(initialFormData.current);
    } else {
      form.reset(emptyFormValues);
    }
  };

  const onSubmit = async (leagueFormValues: TLeagueFormSchema) => {
    let hasErrors = false;
    const convertedCostOfAssociations: number[] = [];

    leagueFormValues?.association?.forEach((association, i) => {
      const convertedCostOfAssociation = convertCroreToRupees(association?.costOfAssociation);

      if (convertedCostOfAssociation === false) {
        hasErrors = true;
        form.setError(
          `association.${i}.costOfAssociation`,
          {
            message: "Cost of association must be a number"
          },
          { shouldFocus: true }
        );
        return;
      } else {
        if (convertedCostOfAssociation) {
          convertedCostOfAssociations.push(convertedCostOfAssociation);
        }
      }
    });

    if (hasErrors) {
      return;
    }

    if (leagueFormValues?.contactPerson) {
      const isNotValid = leagueFormValues?.contactPerson?.find((d, i) => {
        if (d?.contactNumber) {
          const phoneData = getPhoneData(d?.contactNumber);
          if (!phoneData.isValid) {
            form.setError(
              `contactPerson.${i}.contactNumber`,
              {
                message: "Invalid phone number"
              },
              { shouldFocus: true }
            );
            toast.error("Invalid phone number");
            return true;
          } else {
            return false;
          }
        }
      });

      if (isNotValid) {
        return;
      }
    }

    if (leagueFormValues.contactPerson?.length) {
      leagueFormValues.contactPerson.forEach((details, i) => {
        const hasValue =
          details.contactDesignation ||
          details.contactEmail ||
          details.contactLinkedin ||
          details.contactNumber ||
          details.contactName;
        if (hasValue && !details.contactName) {
          hasErrors = true;
          form.setError(`contactPerson.${i}.contactName`, { message: "Name is required" }, { shouldFocus: true });
        }
      });

      if (hasErrors) {
        return;
      }
    }

    const validatedOttPartnerMetrics = validateMetrics(
      "ottPartnerMetrics",
      leagueFormValues?.ottPartnerMetrics,
      form.setError
    );

    const validatedBroadcastMetrics = validateMetrics(
      "broadcastPartnerMetrics",
      leagueFormValues?.broadcastPartnerMetrics,
      form.setError
    );

    if (validatedOttPartnerMetrics === undefined || validatedBroadcastMetrics === undefined) {
      return;
    }

    const isEndorsementsValid = validateEndorsements(leagueFormValues.endorsements, form.setError);

    if (isEndorsementsValid === null) {
      return;
    }

    const requestBody = {
      ...leagueFormValues,
      ottPartnerMetrics: validatedOttPartnerMetrics,
      broadcastPartnerMetrics: validatedBroadcastMetrics,
      association: leagueFormValues.association?.map((asso, index) => ({
        ...asso,
        costOfAssociation: convertedCostOfAssociations[index]
      }))
    };

    try {
      setIsSubmitting(true);
      if (id) {
        const response = await LeagueService.editLeague(id, requestBody);
        if (response.status === HTTP_STATUS_CODES.OK) {
          toast.success("League updated successfully");
        }
        return;
      }
      const response = await LeagueService.createLeague(requestBody);
      if (response.status === HTTP_STATUS_CODES.OK) {
        toast.success("League created successfully");
        form.reset(emptyFormValues);
      }
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError) {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => navigate(-1)} type="button">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {id ? "Edit" : "Create"} League
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                variant="outline"
                size="sm"
                disabled={isSubmitting || isFetchingDetails || isFetchingMetadata}
                onClick={handleDiscard}
                type="button"
              >
                Discard
              </Button>
              <Button
                type="submit"
                size="sm"
                className="gap-1"
                disabled={isSubmitting || isFetchingDetails || isFetchingMetadata}
              >
                <span>Save League</span>
                <Loader visible={isSubmitting} />
              </Button>
            </div>
          </div>
          {isFetchingDetails || isFetchingMetadata ? (
            <FormSkeleton />
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
                <CardWrapper title="League Details">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItemWrapper label="Property Name">
                            <Input {...field} placeholder="Property name" />
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
                            <div className="flex w-full items-center gap-3">
                              <SelectBox
                                options={metadataStore?.tagline}
                                className="w-full"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select a tagline"
                                inputPlaceholder="Search for a tagline..."
                                emptyPlaceholder="No tagline found"
                                multiple
                              />
                              <InputDrawer
                                title="Tagline"
                                description="Create a new tagline to add to the dropdown"
                                register="taglineName"
                                schema={taglineFormSchema}
                                createFn={MetadataService.createTagline}
                                fetchMetadataFn={fetchMetadata}
                              >
                                <PlusCircle className="size-5 cursor-pointer text-green-500" />
                              </InputDrawer>
                            </div>
                          </FormItemWrapper>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="strategyOverview"
                        render={({ field }) => (
                          <FormItemWrapper label="Strategy Overview">
                            <Textarea id="strategyOverview" className="scrollbar" {...field} rows={5} />
                          </FormItemWrapper>
                        )}
                      />
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="yearOfInception"
                        render={({ field }) => (
                          <FormItemWrapper label="Year of Inception">
                            <SelectBox
                              options={getListOfYears()}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Select a year"
                              inputPlaceholder="Search for a year..."
                              emptyPlaceholder="No year found"
                            />
                          </FormItemWrapper>
                        )}
                      />
                    </div>

                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="activeCampaignIds"
                        render={({ field }) => (
                          <FormItemWrapper label="Active Campaigns">
                            <div className="flex w-full items-center gap-3">
                              <SelectBox
                                options={metadataStore?.activeCampaign}
                                className="w-full"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select a campaign"
                                inputPlaceholder="Search for campaigns..."
                                emptyPlaceholder="No campaign found"
                                multiple
                              />
                              <InputDrawer
                                title="Active Campaign"
                                description="Create a new active campaign to add to the dropdown"
                                register="activeCampaignName"
                                schema={activeCampaignFormSchema}
                                createFn={MetadataService.createActiveCampaign}
                                fetchMetadataFn={fetchMetadata}
                              >
                                <PlusCircle className="size-5 cursor-pointer text-green-500" />
                              </InputDrawer>
                            </div>
                          </FormItemWrapper>
                        )}
                      />
                    </div>
                  </div>
                </CardWrapper>

                <CardWrapper title="Marketing">
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="primaryMarketingPlatformIds"
                          render={({ field }) => (
                            <FormItemWrapper label="Primary Marketing Platform">
                              <SelectBox
                                options={metadataStore?.marketingPlatform}
                                value={field.value}
                                onChange={field.onChange}
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
                          name="secondaryMarketingPlatformIds"
                          render={({ field }) => (
                            <FormItemWrapper label="Secondary Marketing Platform">
                              <SelectBox
                                options={metadataStore?.marketingPlatform}
                                value={field.value}
                                onChange={field.onChange}
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
                    <div className="grid grid-cols-3 gap-3">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="primaryMarketIds"
                          render={({ field }) => (
                            <FormItemWrapper label="Primary key Market">
                              <SelectBox
                                options={metadataStore?.keyMarket}
                                value={field.value}
                                onChange={field.onChange}
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
                                options={metadataStore?.keyMarket}
                                value={field.value}
                                onChange={field.onChange}
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
                                options={metadataStore?.state}
                                value={field.value}
                                onChange={field.onChange}
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
                </CardWrapper>

                {/* OTT Partner Metrics */}

                <CardWrapper title="OTT Partner Metrics">
                  <MetricsCard
                    fieldArray={ottPartnerMetricFieldArray}
                    form={form}
                    options={metadataStore.ottPartner}
                    defaultValue={defaultOttPartnerMetric}
                    register="ottPartnerMetrics"
                  />
                </CardWrapper>

                {/* Broadcast Partner Metrics */}

                <CardWrapper title="Broadcast Partner Metrics">
                  <MetricsCard
                    fieldArray={broadcastPartnerMetricFieldArray}
                    form={form}
                    options={metadataStore.broadcastPartner}
                    defaultValue={defaultBroadcastPartnerMetric}
                    register="broadcastPartnerMetrics"
                  />
                </CardWrapper>

                <CardWrapper title="Socials">
                  <TableHeaderWrapper
                    headersArray={[
                      {
                        header: "Platforms",
                        className: "w-[120px]"
                      },
                      { header: "Link" }
                    ]}
                  >
                    {socials.map((social, index) => (
                      <TableRow key={index}>
                        <TableCell className="capitalize">{social.name}</TableCell>
                        <FormField
                          control={form.control}
                          name={social.name}
                          render={({ field }) => (
                            <TableCell>
                              <FormItemWrapper>
                                <Input type="text" {...field} />
                              </FormItemWrapper>
                            </TableCell>
                          )}
                        />
                      </TableRow>
                    ))}
                  </TableHeaderWrapper>
                </CardWrapper>
              </div>

              <div className="grid auto-rows-max items-start gap-4">
                <VerticalFieldsCard control={form.control} title="League Attributes" displayFields={leagueAttributes} />

                <VerticalFieldsCard control={form.control} title="Partnerships" displayFields={partnerships} />

                <VerticalFieldsCard control={form.control} title="Target Audience" displayFields={targetAudience} />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-3">
                <AssociationCard form={form} metadataStore={metadataStore} fetchMetadata={fetchMetadata} />
                <ContactPersonCard control={form.control} />
                <EndorsementCard control={form.control} />
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-col items-center justify-center gap-3 md:hidden">
            <Button
              type="submit"
              size="sm"
              className="w-full gap-1 py-5"
              disabled={isSubmitting || isFetchingDetails || isFetchingMetadata}
            >
              <span>Save League</span>
              <Loader visible={isSubmitting} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full py-5"
              disabled={isSubmitting || isFetchingDetails || isFetchingMetadata}
              onClick={handleDiscard}
              type="button"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LeagueForm;
