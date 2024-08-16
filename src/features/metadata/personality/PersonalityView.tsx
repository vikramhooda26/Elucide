import { Pencil, SquareArrowOutUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../../components/button/BackButton';
import NoDataText from '../../../components/no-data/NoDataText';
import { TableHeaderWrapper } from '../../../components/table/table-header-wrapper';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { TableCell, TableRow } from '../../../components/ui/table';
import { NAVIGATION_ROUTES } from '../../../lib/constants';
import MetadataService from '../../../services/features/MetadataService';
import { nameAndId, personality } from '../../../types/metadata/Metadata';
import { FormSkeleton } from '../../../components/core/form/form-skeleton';

function PersonalityView() {
  const { id } = useParams<string>();
  const [viewData, setViewData] = useState<personality>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      if (!id) {
        setLoading(false);
        return;
      }
      const resp = await MetadataService.getOnePersonality(id ? id : "");
      if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
        throw new Error("");
      }

      const viewObj = resp?.data;

      setViewData(viewObj);

    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const infoHeaders: { header: string; className?: string }[] = [
    { header: "Name" },
  ];

  return (
    <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
      <div className="mx-auto auto-rows-max gap-4">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Personality Trait View
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button size="sm">
              <Pencil className="w-4 h-4" />{" "}
            </Button>
          </div>
        </div>
        {isLoading ? (
          <FormSkeleton />
        ) : (<>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <TableHeaderWrapper headersArray={infoHeaders}>
                  <TableRow>
                    <TableCell>{viewData?.personalityName || "-"}</TableCell>
                  </TableRow>
                </TableHeaderWrapper>
              </Card>
              <div className="grid gap-3 border rounded-md p-4">
                <div>
                  Sub Personality Traits
                </div>
                <ul className="grid gap-3 grid-cols-2">
                  {viewData?.subpersonalities && viewData?.subpersonalities?.length > 0 ? viewData?.subpersonalities?.map(
                    (subp: nameAndId, i: number) => (
                      <li
                        key={i}
                        className="flex items-center gap-2"
                      >
                        <Link to={NAVIGATION_ROUTES.SUB_PERSONALITY + `/${subp.id}`} className="flex items-center gap-2">
                          <span >
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{subp.name}</span>

                          <SquareArrowOutUpRight className="w-4 h-4" />
                        </Link>
                      </li>))
                    :
                    <NoDataText />
                  }
                </ul>
              </div>
            </div>
          </div>
        </>)}
      </div>
    </main>
  )
}

export default PersonalityView;