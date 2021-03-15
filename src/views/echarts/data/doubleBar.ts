// 双柱状图
var labelData = ['上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '富阳区', '临安区'];

export const doubleBarOptions = {
    backgroundColor: '#fff',
    legend: {},
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        /*formatter: function(a: any) {
            var v = a[0];
            return v.name + '<br/>' + v.marker + v.seriesName + '：' + Math.abs(v.value);
        }*/
    },
    xAxis: [
        {
            type: 'value',
            min: -100,
            max: 0,
            gridIndex: 0,
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                formatter: function (v: any) {
                    return (v * -1)
                }
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false
            }
        },
        {
            type: 'value',
            gridIndex: 1,
            min: 0,
            max: 100,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                show: true
            },
            splitLine: {
                show: false
            }
        }
    ],
    yAxis: [
        {
            type: 'category',
            gridIndex: 0,
            inverse: true,
            data: labelData,
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            inverse: true,
            data: labelData,
            axisTick: {
                show: false
            },
            axisLabel: {},
            axisLine: {
                show: false //是否显示轴线
            }
        }
    ],
    grid: [
        {
            top: 50,
            width: '42%',
            left: 35,
            gridIndex: 0,
        },
        {
            top: 50,
            left: '52%',
            right: 35,
            gridIndex: 1,
        }
    ],
    color: ['#5ed29d', '#ec4646', '#fff89a'],
    series: [
        {
            name: '已完成',
            type: 'bar',
            barWidth: 6,
            gridIndex: 0,
            data: [-50, -28, -40, -45, -38, -45, -56, -56, -12, -100],
            itemStyle: {
                normal: {
                    show: true,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#9affd0'
                        }, {
                            offset: 1, color: "#5ed29d"
                        }]
                    },
                    barBorderRadius: 50,
                    borderWidth: 0,
                    borderColor: '#333',
                }
            },
        },
        {
            name: '未落实',
            type: 'bar',
            barWidth: 6,
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [50, 28, 80, 65, 68, 45, 34, 23, 78, 65],
            itemStyle: {
                normal: {
                    show: true,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: "#ec4646"
                        }, {
                            offset: 1, color: '#ffc69a'
                        }]
                    },
                    barBorderRadius: 50,
                    borderWidth: 0,
                    borderColor: '#333',
                }
            },
        },
        {
            name: '问题预警',
            type: 'bar',
            barWidth: 6,
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [50, 28, 80, 65, 68, 45, 34, 23, 11, 44],
            itemStyle: {
                normal: {
                    show: true,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: "#ff9b37"
                        }, {
                            offset: 1, color: '#fff89a'
                        }]
                    },
                    barBorderRadius: 50,
                    borderWidth: 0,
                    borderColor: '#333',
                }
            },
        }

    ]
};