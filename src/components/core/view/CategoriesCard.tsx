import { Dot } from "lucide-react";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { nameAndId } from "../../../types/metadata/Metadata";
import { printLogs } from "../../../lib/logs";

type Props = {
    data: any;
};

function CategoriesCard({ data }: Props) {
    printLogs("Marketing data:", data);
    return (
        <Card x-chunk="dashboard-07-chunk-0 w-full">
            <CardHeader>
                <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Main Category</Label>
                            <ul className="grid gap-3">
                                {data?.maincategory?.length > 0 ? (
                                    data?.maincategory?.map(
                                        (category: any, i: number) => (
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <Dot />
                                                <span>
                                                    {category?.name || "-"}
                                                </span>
                                            </li>
                                        )
                                    )
                                ) : (
                                    <NoDataText />
                                )}
                            </ul>
                        </div>

                        <div className="grid gap-3 rounded-md border p-4">
                            <Label>Sub Category</Label>
                            <ul className="grid gap-3">
                                {data?.subcategory?.length > 0 ? (
                                    data?.subcategory?.map(
                                        (category: nameAndId, i: number) => (
                                            <li className="flex items-center text-sm text-muted-foreground">
                                                <Dot />
                                                <span>
                                                    {category?.name || "-"}
                                                </span>
                                            </li>
                                        )
                                    )
                                ) : (
                                    <NoDataText />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CategoriesCard;
