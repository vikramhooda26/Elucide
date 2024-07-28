import { z } from 'zod';

export type init = {};

export interface State {
    selectedCampaign: string[];
    selectedIncomes: string[];
}

export type Action =
    | { type: 'SET_SELECTED_CAMPAIGN'; payload: string[] }
    | { type: 'SET_SELECTED_INCOMES'; payload: string[] };


export const metricsSchema = z.object({
    viewership: z.string().optional(),
    reach: z.string().optional(),
    year: z.string().optional(),
    viewshipType: z.enum(["OTT", "BROADCAST", '']).optional(),
});

export type MetricType = z.infer<typeof metricsSchema>;