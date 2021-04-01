<template>
    <div class="bus-demo">
        <p>父组件：</p>
        <p>父组件接收son1的值：{{name1}}</p>
        <p>父组件接收son2的值：{{name2}}</p>
        <p>子组件：</p>
        <son1></son1>
        <son2></son2>
        <son3 :name="name">
            <p slot="header">我是header</p>
            <p slot="footer">我是footer</p>
        </son3>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {Son1, Son2, Son3} from './components'

    @Component({
        components: {Son1, Son2, Son3}
    })
    export default class Template extends Vue {

        name: string = "我是父组件"
        name1: string = "";
        name2: string = "";

        mounted() {
            this.$Bus.$on('son1', (name: string) => {
                this.name1 = name;
            });
            this.$Bus.$on('son2', (name: string) => {
                this.name2 = name;
            })
        }

    }
</script>

<style lang="scss" scoped>
    .bus-demo {
        >div, p {
            height: 50px;
            line-height: 50px;
        }
    }
</style>
