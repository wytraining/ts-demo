export interface ColumnConfig {
    title?: string;
    key?: string;
    type?: string;
    align?: string;
    width?: number;
    slot?: string;
    tooltip?: boolean;
    children?: any[];
    render?: Function;
    renderHeader?: Function;
}

export interface TableConfig {
    loading: boolean;
    // tableList: { [propName: string]: string | number }[];
    tableList: any[];
    columns: ColumnConfig[];
    height?: string | number;
}


export interface PageConfig {
    current: number;
    pageSize: number;
    total: number;
}

export interface OptionConfig {
    label: string;
    value: string | number;
}

