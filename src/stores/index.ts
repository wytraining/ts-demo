import Vue from 'vue'
import Vuex from 'vuex'

import test from './test'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null
    },
    mutations: {
        getUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    modules: {
        test
    },
    actions: {

    }
})
