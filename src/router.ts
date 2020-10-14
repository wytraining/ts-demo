import Vue from 'vue'
import Router from 'vue-router'
import code from './router/code'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/main',
        },
        {
            path: '/login',
            component: () => import('./views/Login.vue'),
        },
        { //懒加载
            path: '/main',
            component: () => import('./layout/Main.vue'),
            children: [
                {
                    path: '',
                    redirect: 'echarts',
                },
                {
                    path: 'echarts',
                    meta: {
                        name: 'echarts'
                    },
                    component: () => import('./views/Echarts.vue'),
                },
                {
                    path: 'scroll',
                    meta: {
                        name: 'scroll'
                    },
                    component: () => import('./views/Scroll.vue'),
                },
                {
                    path: 'editor',
                    meta: {
                        name: 'editor'
                    },
                    component: () => import('./views/Editor.vue'),
                },
                {
                    path: 'map',
                    meta: {
                        name: 'map'
                    },
                    component: () => import('./views/Map.vue'),
                },
                ...code.routers,
            ]
        }
    ]
})
