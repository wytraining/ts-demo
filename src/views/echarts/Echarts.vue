<template>
    <div class="echarts">

        <!--单个echarts-->
        <v-chart :options="barOptions" :autoResize="true" @click="handlerClick"></v-chart>

        <!--循环列表-->
        <v-chart :options="item"
                 v-for="(item, index) in optionList"
                 :key="index"
                 :autoResize="true"
                 @click="handlerClick">
        </v-chart>

    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {barOptions} from './data/bar'
    import {liquidFill} from './data/liquidFill'
    import {pieOptions} from './data/pie'
    import {pieOptions2} from './data/pie2'

    @Component
    export default class echarts extends Vue {

        // 单个echarts
        barOptions = barOptions; // 柱状图

        // 循环列表
        optionList: Array<any> = [barOptions, liquidFill, pieOptions, pieOptions2];

        handlerClick(params: EchartMouseEvent) {
            console.log(params)
        }
    }
</script>
<style lang="scss" scoped>
    .echarts {
        height: 100%;
        width: 100%;
        overflow-y: auto;

        > div {
            width: 50%;
            height: 50%;
            display: inline-block;
        }
    }
</style>
