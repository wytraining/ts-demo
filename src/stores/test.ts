export default {
    namespaced: true,
    state: {
        testNumber: 10,
        testNumber2: 20,
    },
    mutations: {
        /**
         * 修改testNumber的值
         * @param state
         * @param payload
         */
        changeTestNumber(state: any, payload: any) {
            state.testNumber = payload
        }
    }
}