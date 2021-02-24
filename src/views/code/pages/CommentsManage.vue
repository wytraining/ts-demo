<template>
    <div class="comments-manage">
        评论管理
        <p>原始数量：{{testNumber}}</p>
        <p>原始数量2：{{testNumber2}}</p>
        <Button @click="changeTestNumber">修改数量1</Button>
        <Button v-debounce="{event: testDebounce, timeout: 1000}">防止重复点击(防抖)</Button>
        <Button @click="testDebounce" v-preventReClick="1000" >防止重复点击(节流：按钮灰掉)</Button>
        <p v-pin="{top:'200', color: 'red'}">自定义指令</p>

        <Input type="text" v-model="name" placeholder="防抖测试"
               v-debounce="{trigger: 'keydown',event: changeName, timeout: 1000}" />

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

        name: string = "";


        //获取store中的值
        /*get testNumber() {
            // return (store.state as any).test.testNumber
            return this.$store.state.test.testNumber
        }*/

        //引用store中的方法
        changeTestNumber() {
            store.commit('test/changeTestNumber', 100);
        }


        testDebounce() {
            console.log(11);
        }

        changeName() {
            console.log(this.name);
        }


    }
</script>

<style lang="scss" scoped>

</style>
