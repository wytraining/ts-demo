import {$get, $post} from '../http'
import http from "axios";
import {MessageTarget, MessageResponse} from './interface'

// 获取行业类型
export const getHYList = (): Promise<object | any> => {
    const url = `tool/hylx`;
    return http.get(url).then((res: any) => res.data);
};

// // 列表
// export const getTableList = (params: any): Promise<object | any> => {
//     const url = `epcode/health/msgList`;
//     return http.get(url, {params: params}).then((res: any) => res.data);
// };

//
// // 列表
// export const getMessageList = (params: MessageTarget): Promise<MessageResponse> => {
//     const url = `epcode/health/msgList`;
//     return http.get(url, {params: params}).then(({data}: { data: MessageResponse }) => data);
// };


// 列表
export const getMessageList = (params: MessageTarget): Promise<MessageResponse> =>
    $get(`epcode2/api2/getCompanyList2`,params, {...params,name222: '222'});

// 列表：test $post
export const getMessageList2 = (params: MessageTarget): Promise<MessageResponse> =>
    $post(`epcode2/api2/getCompanyList2`,params, {...params,name222: '222'});
