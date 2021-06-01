import Vue from 'vue';
import { AxiosStatic } from "axios"

declare module 'vue/types/vue' {
    interface utils {
        deepCopy<T>(obj: T): T;

        dateFormat(date: Date | string | number, fmt: string): string;
    }

    // 来声明全局属性
    interface Vue {
        $http: AxiosStatic,
        $http2: AxiosStatic,
        $getMapConfig: Function,
        $utils: utils,
        $print: Function,
        $Bus: any
    }
}
