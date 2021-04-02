export default {
    routers: [
        {
            path: 'code',
            meta: {
                name: 'code'
            },
            component: () => import('@/views/code/Code.vue'),
            children: [
                {
                    path: '',
                    redirect: 'articleManage'
                },
                {
                    path: 'articleManage',
                    meta: {
                        name: 'articleManage'
                    },
                    component: () => import('@/views/code/pages/ArticleManage.vue'),
                },
                {
                    path: 'articleManage2',
                    meta: {
                        name: 'articleManage2'
                    },
                    component: () => import('@/views/code/pages/ArticleManage2/ArticleManage2.vue'),
                },
                {
                    path: 'commentsManage',
                    meta: {
                        name: 'commentsManage'
                    },
                    component: () => import('@/views/code/pages/CommentsManage.vue'),
                },
                {
                    path: 'rule',
                    meta: {
                        name: 'rule'
                    },
                    component: () => import('@/views/code/pages/Rule.vue'),
                },
                {
                    path: 'drag',
                    meta: {
                        name: 'drag'
                    },
                    component: () => import('@/views/code/pages/Drag.vue'),
                },
                {
                    path: 'promise',
                    meta: {
                        name: 'promise'
                    },
                    component: () => import('@/views/code/pages/Promise.vue'),
                },
                {
                    path: 'language',
                    meta: {
                        name: 'language'
                    },
                    component: () => import('@/views/code/pages/Language.vue'),
                },
                {
                    path: 'routerJupm',
                    meta: {
                        name: 'routerJupm'
                    },
                    component: () => import('@/views/code/pages/RouterJupm.vue')
                },
                {
                    // path: 'detail',
                    path: 'detail/:id/:name', //刷新不消失params参数
                    name: 'detail',
                    meta: {
                        name: 'detail'
                    },
                    component: () => import('@/views/code/pages/routerJupm/RouterDetail.vue')
                },
                {
                    path: 'exportWord',
                    meta: {
                        name: 'exportWord'
                    },
                    component: () => import('@/views/code/pages/ExportWord.vue')
                },
                {
                    path: 'classDemo',
                    meta: {
                        name: 'classDemo'
                    },
                    component: () => import('@/views/code/pages/classDemo/ClassDemo.vue')
                },


                /***
                 * vue
                 */
                {
                    path: 'busDemo',
                    meta: {
                        name: 'busDemo'
                    },
                    component: () => import('@/views/code/vuePages/Bus/BusDemo.vue')
                },



            ]
        }
    ]
}