<template>
    <div class="comments-manage">
        评论管理
        <p>原始数量：{{testNumber}}</p>
        <p>原始数量2：{{testNumber2}}</p>
        <Button @click="changeTestNumber">修改数量1</Button>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import store from '@/stores'
    import {mapState, mapMutations} from 'vuex';

    @Component({
        components: {

        },
        computed: {
            ...mapState({
                //获取store中的值
                'testNumber': state => (state as any).test.testNumber,
                'testNumber2': state => (state as any).test.testNumber2,
            })
        }
    })
    export default class Template extends Vue {


        //获取store中的值
        /*get testNumber() {
            // return (store.state as any).test.testNumber
            return this.$store.state.test.testNumber
        }*/

        //引用store中的方法
        changeTestNumber() {
            store.commit('test/changeTestNumber', 100);
        }


    }
</script>

<style lang="scss" scoped>

</style>
