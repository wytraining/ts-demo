<template>
    <div class="echarts">
        <div id="container"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import Highcharts from 'highcharts/highstock';
    import Highcharts3D from 'highcharts/highcharts-3d';

    Highcharts3D(Highcharts);

    @Component({
        components: {}
    })
    export default class Pie extends Vue {

        // @Prop() datas: any;

        datas: Array<any> = [
            {
                name: '可疑',
                y: 60,
                color: '#ff895d',
                sliced: true,
                // selected: true,
            },
            {
                name: '超标突变',
                y: 30,
                color: '#ffca6a'
            },
            {
                name: '排污口稀释',
                y: 20,
                color: '#68adff'
            },
        ];

        getChart() {
            let chart = Highcharts.chart('container', {
                credits: {
                    enabled: false // 去掉版权
                },
                chart: {
                    type: 'pie',
                    marginRight: 200,
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: ''
                },
                legend: {
                    align: 'right',
                    x: -10,
                    y: 0,
                    layout: 'vertical',
                    verticalAlign: 'top',
                    symbolRadius: 0, // 图例为正方形
                    // symbolPadding: 12, // 文字和图例的间距
                    itemMarginTop: 13,
                    itemStyle: {
                        fontWeight: "normal",
                    },
                    labelFormatter: function () {
                        return (
                            "<p>" +
                            "<span style='width: 100px;display: inline-block;'>" + this.name + "</span>" +
                            "<span style='color: #5284ff;width: 45px;text-align: right;display: inline-block'>" + ((this as any).percentage).toFixed(1) + '%' + "</span>" +
                            "</p>"
                        )
                    }
                },
                tooltip: {
                    pointFormat: ' <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}%'
                        },
                        showInLegend: true // 显示图例
                    }
                },
                series: [{
                    type: 'pie',
                    name: '在线问题线索分析',
                    data: this.datas
                }]
            })
        }


        mounted() {
            this.getChart();
        }


    }
</script>

<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 100%;

        #container {
            height: 130px;
        }
    }
</style>

