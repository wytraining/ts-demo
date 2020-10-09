// import "reflect-metadata";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
// import 'quill/dist/quill.core.css' //不可用
// import 'quill/dist/quill.bubble.css' //不可用
// import * as Quill from 'quill'; // 富文本基于quill

import './utils/class-component-hooks'
import plugin from "./utils/suc-plugin";

Vue.use(plugin);

import { LoadingBar } from 'iview';
import axios from 'axios';

import './styles/index.scss';

import ViewUI from "view-design"
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI);

if (process.env.NODE_ENV === 'development') {
    //开发环境 do something
    axios.defaults.baseURL = "./api";
} else {
    //生产环境 do something
}

import scroll from 'vue-seamless-scroll'
Vue.use(scroll);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.replace({
                    path: '/login',
                });
                break;
            case 403:
                router.replace({
                    path: '/login',
                });
                break;
            default:
                try {
                    if (error.response.request.responseURL.includes('authox/curUser')) {
                        router.replace({
                            path: '/login',
                        });
                    }
                } catch (e) {
                    console.log(e)
                }
        }
    }
    return Promise.reject(error.response)
});

router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
});

router.afterEach(route => {
    LoadingBar.finish();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
