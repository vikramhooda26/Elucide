import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BackButton from "../../components/button/BackButton";
import { socials } from "../../components/core/data/socials";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import Activation from "../../components/core/view/Activation";
import Association from "../../components/core/view/Association";
import AudienceProfile from "../../components/core/view/AudienceProfile";
import ContactPerson from "../../components/core/view/ContactPerson";
import LinksCard from "../../components/core/view/LinksCard";
import MarketingOverviewCard from "../../components/core/view/MarketingOverviewCard";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import TeamOverviewCard from "../../components/core/view/TeamOverviewCard";
import ViewershipReach from "../../components/core/view/ViewershipReach";
import { Button } from "../../components/ui/button";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import TeamService from "../../services/features/TeamService";
import { useAuth } from "../auth/auth-provider/AuthProvider";

function TeamView() {
  const { id } = useParams<string>();
  const [team, setTeam] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userRole = useUser()?.role;
  if (!userRole) {
    return;
  }

  const teamInfoHeaders: { header: string; className?: string }[] = [
    { header: "Name" },
    { header: "Year of Inception" },
    { header: "Franchise Fee (in cr)" }
  ];

  const fetchTeam = async () => {
    try {
      setIsLoading(true);
      if (!id) {
        setIsLoading(false);
        return;
      }
      const resp = await TeamService.getOne(id ? id : "");
      if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
        throw new Error("");
      }
      const teamObj = resp?.data;
      setTeam(teamObj);
    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
      if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
        toast.error("This team does not exists");
        navigate(-1);
      } else {
        toast.error("An unknown error occurred");
        navigate(-1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <main className="my-8 flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto auto-rows-max gap-4">
        <div className="mb-4 flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Team View
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {userRole === "SUPER_ADMIN" ? (
              <Button size="sm" onClick={() => navigate(`${NAVIGATION_ROUTES.EDIT_TEAM}/${id}`)}>
                <Pencil className="h-4 w-4" />{" "}
              </Button>
            ) : null}
          </div>
        </div>
        {isLoading ? (
          <FormSkeleton />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <TeamOverviewCard data={team} />
                <MarketingOverviewCard data={team} />
                <LinksCard data={team} metadatas={socials} title="Digital Presence" />
                <ViewershipReach data={team} />
                <Association data={team} />
              </div>
              <AudienceProfile data={team} title={"Team"} />
            </div>
            <div className="my-4 lg:my-8">
              <div className="space-y-4 lg:space-y-8">
                <SportsDealSummary data={team} partnerKey={"team"} />
                <Activation data={team} partnerKey={"team"} />
              </div>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ContactPerson data={team} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default TeamView;
