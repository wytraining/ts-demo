import axios from "axios";

const token = "6666";

/***
 * get 方法
 * @param url：请求地址
 * @param params：请求参数
 * @param config：配置请求头
 */
export function $get<T>(url: string, params?: any, config?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get<T>(url, {
            params,
            headers: {
                ...config,
                "refresh-token": token
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err.data))
    });
}

/***
 * post方法
 * @param url：请求地址
 * @param body：body传参
 * @param params：query传参
 * @param config：配置请求头
 */
export function $post(url: string, body?: any, params?: any, config?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(url, body, {
                params,
                headers: {
                    "refresh-token": token,
                    ...config
                }

            }
        )
            .then(res => resolve(res.data))
            .catch(err => reject(err.data))
    });
}


// if (process.env.NODE_ENV == "development") {
//     axios.defaults.baseURL = "./api";
// } else if (process.env.NODE_ENV == "debug") {
// } else if (process.env.NODE_ENV == "production") {
//     axios.defaults.baseURL = "http://124.160.109.243:50200";
// }
// // axios.defaults.baseURL = "http://124.160.109.243:50200";
//
// // 超时时间
// axios.defaults.timeout = 10000;
//
// // 设置 post 请求头
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
//
// // 请求拦截，暂不需要
//
// // 响应拦截
// axios.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return Promise.resolve(response);
//         } else {
//             return Promise.reject(response);
//         }
//     },
//     reason => {}
// );
