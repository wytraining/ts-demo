import http from "axios";

// 获取行业类型
export const getHYList = (): Promise<object | any> => {
    const url = `tool/hylx`;
    return http.get(url).then((res: any) => res.data);
};

// 在线督办：超标原因确定
export const getRdoc3 = (params: any): Promise<object | any> => {
    const url = `epcode/overStandard/rdoc3`;
    return http.get(url, {params: params}).then((res: any) => res.data);
};