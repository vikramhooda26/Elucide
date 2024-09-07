import { customRound } from "../../../features/utils/helpers";
import NoDataText from "../../no-data/NoDataText";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

type Props = {
    data: any;
};

function CategoriesCard({ data }: Props) {
    const totalSubCategories = data?.mainCategories?.reduce(
        (total: any, category: any) => {
            return total + (category.subCategories?.length ?? 0);
        },
        0
    );

    const calculateCategoryPercentage = (subCategoryCount: number) => {
        if (totalSubCategories) {
            return customRound((subCategoryCount / totalSubCategories) * 100);
        }

        return 0;
    };

    let totalPercentage = 0;

    const calculatePercentages = (category: any, isLastIndex: boolean) => {
        const count = category.subCategories?.length ?? 0;
        const percentage = calculateCategoryPercentage(count);

        if (isLastIndex) {
            return 100 - totalPercentage;
        }

        totalPercentage += percentage;
        return percentage;
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Categories
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="grid gap-6 p-6">
                    <div className="my-4 grid grid-cols-2 gap-6">
                        <div className="grid gap-3">
                            <div className="font-semibold">Main Categories</div>
                        </div>
                        <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">Sub Categories</div>
                        </div>

                        {data?.mainCategories &&
                            data?.mainCategories?.length > 0 ? (
                            data?.mainCategories?.map(
                                (category: any, i: number) => (
                                    <>
                                        <div className="grid">
                                            <div key={i} className="grid">
                                                <div className="flex flex-col text-muted-foreground">
                                                    <span>
                                                        {" "}
                                                        {category?.name ||
                                                            "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid gap-1">
                                            {category?.subCategories?.length ? (
                                                category?.subCategories?.map(
                                                    (
                                                        category: any,
                                                        i: number
                                                    ) => (
                                                        <div
                                                            key={i}
                                                            className="grid gap-3"
                                                        >
                                                            <div className="text-muted-foreground">
                                                                {category?.name ||
                                                                    "N/A"}
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <NoDataText />
                                            )}
                                        </div>
                                    </>
                                )
                            )
                        ) : (
                            <NoDataText />
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CategoriesCard;
