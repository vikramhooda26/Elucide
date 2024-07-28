export type init = {};

export interface State {
    selectedCampaign: string[];
    selectedIncomes: string[];
}

export type Action =
    | { type: 'SET_SELECTED_CAMPAIGN'; payload: string[] }
    | { type: 'SET_SELECTED_INCOMES'; payload: string[] };