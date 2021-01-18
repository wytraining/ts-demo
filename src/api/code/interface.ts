// 咨询管理
export interface MessageTarget {
    companyName: string,
    city: string,
    pollution: string,
    beginTime: string,
    endTime: string
}

// 列表(公共)
export interface BaseResponse {
    pageindex: number,
    totalcount: number,
    totalpage: string
}

// 信息
export interface MessageItem {
    COMPANYID: string,
    COMPANYNAME: string,
    CONTACT: string,
    CREATETIME: string
    ID: string
    PROBLEM: string
    REPLY: string
}

export type MessageList = MessageItem[];

export interface MessageResponse extends BaseResponse{
    result: MessageList
}

// 人员
export interface PersonItem2 {
    COMPANYID: string,
    COMPANYNAME: string,
    CONTACT: string,
    CREATETIME: string
    ID: string
    PROBLEM: string
    REPLY: string
}

export type PersonList = PersonItem2[];

export interface PersonResponse extends BaseResponse{
    result: PersonList
}

