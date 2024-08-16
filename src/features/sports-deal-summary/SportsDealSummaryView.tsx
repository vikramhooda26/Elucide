import { Diamond, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/button/BackButton';
import { TableHeaderWrapper } from '../../components/table/table-header-wrapper';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { TableCell, TableRow } from '../../components/ui/table';
import MetadataService from '../../services/features/MetadataService';
import { activation, sportsDealSummary } from '../../types/metadata/Metadata';
import NoDataText from '../../components/no-data/NoDataText';
import { FormSkeleton } from '../../components/core/form/form-skeleton';

function SportsDealSummaryView() {
    const { id } = useParams<string>();
    const [viewData, setViewData] = useState<sportsDealSummary>({});
    const [isLoading, setLoading] = useState<boolean>(false);

    const fetchTeam = async () => {
        try {
            setLoading(true);
            if (!id) {
                setLoading(false);
                return;
            }
            const resp = await MetadataService.getOneSportsDealSummary(id ? id : "");
            if (resp?.status !== 200 || Object.keys(resp?.data)?.length <= 0) {
                // throw new Error("");
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
        { header: "Brand Name" },
        { header: "Territory" },
        { header: "Partner Name" },
        { header: "Status" },
    ];

    return (
        <main className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
            <div className="mx-auto auto-rows-max gap-4">
                <div className="flex items-center gap-4 mb-4">
                    <BackButton />
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Sports Deal Summary View
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
                                        <TableCell>{viewData?.brand?.name || "-"}</TableCell>
                                        <TableCell>
                                            {viewData?.territory?.name || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {viewData?.partner?.name || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {viewData?.status || "-"}
                                        </TableCell>
                                    </TableRow>
                                </TableHeaderWrapper>
                            </Card>


                            <div className="grid gap-6  ">
                                <div className="grid gap-3 grid-cols-3">
                                    <div className="grid gap-3 border rounded-md p-4">
                                        <div>
                                            Commencement Date
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>{viewData?.commencementDate || '-'}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="grid gap-3 border rounded-md p-4">
                                        <div>
                                            Expiration Date
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>{viewData?.expirationDate || '-'}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="grid gap-3 border rounded-md p-4">
                                        <div>
                                            Duration
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>{viewData?.duration || '-'}</span>
                                            </li>
                                        </ul>
                                    </div>


                                    <div className="grid gap-3 border rounded-md p-4">
                                        <div>
                                            Total Value
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>{viewData?.totalValue || '-'}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="grid gap-3 border rounded-md p-4">
                                        <div>
                                            Annual Value
                                        </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <span>{viewData?.annualValue || '-'}</span>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="grid gap-6  ">
                                <div className="grid gap-3 grid-cols-3">
                                    {viewData?.mediaLink?.length ?
                                        <Link to={viewData?.mediaLink || ''} target='_blank'>
                                            <Button>
                                                Media Link
                                            </Button>
                                        </Link>
                                        : <Button>
                                            No Link
                                        </Button>}
                                </div>
                            </div>

                            <div className="grid gap-6  ">
                                <div className="grid gap-3 grid-cols-3">
                                    <div className="grid gap-3 border rounded-md p-4">
                                        <div>
                                            Assets
                                        </div>
                                        <ul className="grid gap-3">
                                            {viewData?.assets && viewData?.assets?.length > 0 ? viewData?.assets?.map(
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
                                </div>
                            </div>

                        </div>
                    </div>
                </>)}
            </div>
        </main>
    )
}

export default SportsDealSummaryView;
