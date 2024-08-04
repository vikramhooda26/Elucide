import {
  ChevronLeft,
  Pencil
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActiveCampaing from "../../components/core/common/ActiveCampaing";
import Association from "../../components/core/common/Association";
import Attributes from "../../components/core/common/Attributes";
import ContactPerson from "../../components/core/common/ContactPerson";
import Endorsements from "../../components/core/common/Endorsements";
import Marketing from "../../components/core/common/Marketing";
import Socials from "../../components/core/common/Socials";
import SportsDealSummary from "../../components/core/common/SportsDealSummary";
import StrategyOverview from "../../components/core/common/StrategyOverview";
import TagLines from "../../components/core/common/TagLines";
import { Button } from "../../components/ui/button";
import {
  Card
} from "../../components/ui/card";
import BrandService from "../../services/features/BrandService";

function BrandView() {
  const { id } = useParams<string>();
  const [brand, setBrand] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

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
    <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
      <div className="mx-auto auto-rows-max gap-4">
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
            Brand View
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button size="sm">
              <Pencil className="w-4 h-4" />{" "}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <div className=" m-3">
                <ul className="grid gap-3">
                  <li className="flex items-center ">
                    <span className="w-1/2">Company Name</span>
                    <span className="text-muted-foreground">
                      {brand?.companyName || '-'}
                    </span>
                  </li>
                  {/* <li className="flex items-center ">
                    <span className="w-1/2">
                      Year Of Inception
                    </span>
                    <span className="text-muted-foreground">
                      {brand?.yearOfInception || '-'}
                    </span>
                  </li>
                  <li className="flex items-center ">
                    <span className="w-1/2">
                      Franchise Fee
                    </span>
                    <span className="text-muted-foreground">
                      {brand?.franchiseFee || '-'}
                    </span>
                  </li> */}
                </ul>
              </div>
            </Card>

            <StrategyOverview strategy={brand?.strategyOverview} />

            <TagLines data={brand} />

            <Marketing data={brand} />

            <Socials data={brand} />

            <ActiveCampaing data={brand} />

            <Endorsements data={brand} />

            <Association data={brand} />

            <ContactPerson data={brand} />
          </div>
          <Attributes data={brand} title={'Brand'} />
        </div>
        <div className="my-8">
          <SportsDealSummary data={brand} />
        </div>
        
      </div>
    </main >
  );
}

export default BrandView;