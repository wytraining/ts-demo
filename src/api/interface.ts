export interface BaseResponse {
    pageindex: number,
    totalcount: number,
    totalpage: string
}

// 列表1
export interface ITableListItem {
    COMPANYID: string,
    COMPANYNAME: string,
    CONTACT: string,
    CREATETIME: string
    ID: string
    PROBLEM: string
    REPLY: string
}

export type ITableList = ITableListItem[];

export interface ITableResponse extends BaseResponse{
    result: ITableList
}

// 列表2
export interface ITableListItem2 {
    COMPANYID: string,
    COMPANYNAME: string,
    CONTACT: string,
    CREATETIME: string
    ID: string
    PROBLEM: string
    REPLY: string
}

export type ITableList2 = ITableListItem2[];

export interface ITableResponse2 extends BaseResponse{
    result: ITableList2
}

