import http from "axios";

// 获取行业类型
export const getHYList = (): Promise<object | any> => {
    const url = `tool/hylx`;
    return http.get(url).then((res: any) => res.data);
};