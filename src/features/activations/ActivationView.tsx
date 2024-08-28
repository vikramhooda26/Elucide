import { Diamond, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/button/BackButton';
import { TableHeaderWrapper } from '../../components/table/table-header-wrapper';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { TableCell, TableRow } from '../../components/ui/table';
import MetadataService from '../../services/features/MetadataService';
import { activation } from '../../types/metadata/Metadata';
import NoDataText from '../../components/no-data/NoDataText';
import ErrorService from '../../services/error/ErrorService';
import { useAuth } from '../auth/auth-provider/AuthProvider';
import { HTTP_STATUS_CODES } from '../../lib/constants';
import { toast } from 'sonner';

function ActivationView() {
  const { id } = useParams<string>();
  const [viewData, setViewData] = useState<activation>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchTeam = async () => {
    try {
      setLoading(true);
      if (!id) {
        setLoading(false);
        return;
      }
      const resp = await MetadataService.getOneActivation(id ? id : "");
      if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
        // throw new Error("");
      }

      const viewObj = resp?.data;

      setViewData(viewObj);

    } catch (error) {
      const unknownError = ErrorService.handleCommonErrors(
        error,
        logout,
        navigate
      );
      if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
        toast.error("This activation does not exists");
        navigate(-1);
      } else {
        toast.error("An unknown error occurred");
        navigate(-1);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const infoHeaders: { header: string; className?: string }[] = [
    { header: "Name" },
    { header: "Year" },
  ];

  return (
    <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
      <div className="mx-auto auto-rows-max gap-4">
        <div className="flex items-center gap-4 mb-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Activation View
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
              <TableHeaderWrapper headersArray={infoHeaders}>
                <TableRow>
                  <TableCell>{viewData?.name || "-"}</TableCell>
                  <TableCell>
                    {viewData?.year || "-"}
                  </TableCell>
                </TableRow>
              </TableHeaderWrapper>
            </Card>


            <div className="grid gap-6  ">
              <div className="grid gap-3 grid-cols-2">
                <div className="grid gap-3 border rounded-md p-4">
                  <div>
                    Team Name
                  </div>
                  <ul className="grid gap-3">
                    <li className="flex items-center text-sm text-muted-foreground">
                      <span>{viewData?.teamName || '-'}</span>
                    </li>
                  </ul>
                </div>

                <div className="grid gap-3 border rounded-md p-4">
                  <div>
                    Athlete Name
                  </div>
                  <ul className="grid gap-3">
                    <li className="flex items-center text-sm text-muted-foreground">
                      <span>{viewData?.athleteName || '-'}</span>
                    </li>
                  </ul>
                </div>

                <div className="grid gap-3 border rounded-md p-4">
                  <div>
                    League Name
                  </div>
                  <ul className="grid gap-3">
                    <li className="flex items-center text-sm text-muted-foreground">
                      <span>{viewData?.leagueName || '-'}</span>
                    </li>
                  </ul>
                </div>

                <div className="grid gap-3 border rounded-md p-4">
                  <div>
                    Brand Name
                  </div>
                  <ul className="grid gap-3">
                    <li className="flex items-center text-sm text-muted-foreground">
                      <span>{viewData?.brandName || '-'}</span>
                    </li>
                  </ul>
                </div>


              </div>
            </div>

            <div className="grid gap-6  ">
              <div className="grid gap-3 grid-cols-3">
                <div className="grid gap-3 border rounded-md p-4">
                  <div>
                    Assets
                  </div>
                  <ul className="grid gap-3">
                    {viewData?.asset && viewData?.asset?.length > 0 ? viewData?.asset?.map(
                      (asset: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-2"
                        >
                          <span className="text-muted-foreground">
                            <Diamond className="w-4 h-4" />
                          </span>
                          <span>{asset}</span>
                        </li>))
                      :
                      <NoDataText />
                    }
                  </ul>
                </div>
                <div className="grid gap-3 border rounded-md p-4">
                  <div>
                    Types
                  </div>
                  <ul className="grid gap-3">
                    {viewData?.type && viewData?.type?.length > 0 ? viewData?.type?.map(
                      (type: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-2"
                        >
                          <span className="text-muted-foreground">
                            <Diamond className="w-4 h-4" />
                          </span>
                          <span>{type}</span>
                        </li>))
                      :
                      <NoDataText />
                    }
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default ActivationView;