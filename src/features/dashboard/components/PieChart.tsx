"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../components/ui/chart"

export const description = "A pie chart with a label list"

export type TchartData = {
    name: string;
    total: number;
    fill: string;
}

type Props = {
    chart: {
        chartConfig: ChartConfig;
        chartData: TchartData[];
    };
    displayName: string;
}


export function PieChartComponent({ chart, displayName }: Props) {
    return (
        <Card className="flex flex-col border-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>{displayName || ''} Chart</CardTitle>
                {/* <CardDescription>January - June 2024</CardDescription> */}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chart?.chartConfig}
                    className="mx-auto aspect-square max-h-[250px] lg:max-h-[350px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="total" hideLabel />}
                        />
                        <Pie data={chart?.chartData} dataKey="total">
                            <LabelList
                                dataKey="name"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chart.chartConfig) =>
                                    chart?.chartConfig?.[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div> */}
            </CardFooter>
        </Card>
    )
}
