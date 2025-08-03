export type itemType = { label: string; value: string };

export interface selectorContentType {
  selectorContent: {
    title: string;
    items: itemType[] | [];
    isMultiple?: boolean;
    isSearchable?: boolean;
    isClearable?: boolean;
    searchCallback?: (searchFrom: string, searchTerm: string) => void;
    selectState?: string[];
    onChange?: (selected: string[]) => void;
    searchFrom?: string;
  };
}

export interface IPageType {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}
