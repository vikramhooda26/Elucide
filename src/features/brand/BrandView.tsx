import {
  ChevronLeft,
  Pencil
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveCampaing from "../../components/core/view/ActiveCampaing";
import Association from "../../components/core/view/Association";
import Attributes from "../../components/core/view/Attributes";
import ContactPerson from "../../components/core/view/ContactPerson";
import Endorsements from "../../components/core/view/Endorsements";
import Marketing from "../../components/core/view/Marketing";
import Socials from "../../components/core/view/Socials";
import SportsDealSummary from "../../components/core/view/SportsDealSummary";
import StrategyOverview from "../../components/core/view/StrategyOverview";
import TagLines from "../../components/core/view/TagLines";
import { Button } from "../../components/ui/button";
import {
  Card
} from "../../components/ui/card";
import BrandService from "../../services/features/BrandService";
import BackButton from "../../components/button/BackButton";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { useUser } from "../../hooks/useUser";
import { NAVIGATION_ROUTES } from "../../lib/constants";
import CategoriesCard from "../../components/core/view/CategoriesCard";

function BrandView() {
  const { id } = useParams<string>();
  const [brand, setBrand] = useState<any>({});
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
      const resp = await BrandService.getOne(id ? id : '');
      if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
        throw new Error('');
      }
      const teamObj = resp?.data;

      teamObj.createdBy = teamObj?.createdBy?.firstName || '';
      teamObj.modifiedBy = teamObj?.modifiedBy?.firstName || '';

      setBrand(teamObj);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 my-8">
      <div className="mx-auto auto-rows-max gap-4">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Brand View
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {userRole === "SUPER_ADMIN" ?
              <Button size="sm"
                onClick={() => navigate(`${NAVIGATION_ROUTES.EDIT_BRAND}/${id}`)}
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
                        {brand?.name || '-'}
                      </span>
                    </li>
                    <li className="flex items-center ">
                      <span className="w-1/2">Parent Company</span>
                      <span className="text-muted-foreground">
                        {brand?.parentOrg?.name || '-'}
                      </span>
                    </li>
                    <li className="flex items-center ">
                      <span className="w-1/2">Agency</span>
                      <span className="text-muted-foreground">
                        {brand?.agency?.name || '-'}
                      </span>
                    </li>
                    <li className="flex ">
                      <span className="w-1/2">
                        City
                      </span>
                      <span className="text-muted-foreground">
                        {brand?.city?.name || "-"}
                      </span>
                    </li>

                    <li className="flex ">
                      <span className="w-1/2">
                        State
                      </span>
                      <span className="text-muted-foreground">
                        {brand?.state?.name || "-"}
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>

              <CategoriesCard data={brand} />

              <StrategyOverview strategy={brand?.strategyOverview} />

              <Socials data={brand} />

              <Marketing data={brand} />

              <TagLines data={brand} />

              <Endorsements data={brand} />

              <ActiveCampaing data={brand} />

            </div>
            <Attributes data={brand} title={'Brand'} />
          </div>
          <div className="my-8">
            <SportsDealSummary data={brand} />
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ContactPerson data={brand} />
            </div>
          </div>
        </>)}
      </div>
    </main >
  );
}

export default BrandView;