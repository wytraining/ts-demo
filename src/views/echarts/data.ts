// 基本柱状图
export const barOptions = {
    title: {
        text: "ECharts 入门示例"
    },
    tooltip: {},
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [
        {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
        }
    ]
};


//水球图
export const liquidFill = {
    title: {
        text: '基本水球图'
    },
    series: [{
        type: 'liquidFill',
        data: [0.6]
    }]
};