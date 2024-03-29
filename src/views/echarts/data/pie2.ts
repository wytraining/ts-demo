// 圆环：并排图例

const data: Array<any> = [
    {
        value: 335, name: '双随机抽查',
        percent: '17%',
        itemStyle: {
            color: "#62b8ff"
        }
    },
    {
        value: 310, name: '日常巡查检查',
        percent: '15%',
        itemStyle: {
            color: "#00b8c3"
        }
    },
    {
        value: 234, name: '交叉检查',
        percent: '14%',
        itemStyle: {
            color: "#ffbd43"
        }
    }
];

export const pieOptions2 = {
    title: {
        text: "圆环：并排图例"
    },
    /*tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },*/
    color: ['#807ffb','#62b8ff','#ffbd43','#fe9167','#00b8c3'],
    //生成的图片和顶部的间距
    grid: {
        top: 100,
        left: 120,
        right: 220,
        containLabel: true//为ture才会生效
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        icon: "circle",
        itemWidth: 15,
        itemHeight: 10,
        right: 50,
        top: 50,
        bottom: 20,
        textStyle: {
            color: "#666",
            fontSize: 14,
            lineHeight: 20,
            rich: {
                a: {
                    color: '#333',
                    width: 150,
                },
                b: {
                    color: 'rgba(52, 137, 255, 1)',
                    padding: [0, 5, 0, 0],
                    width: 55,
                },
                c: {
                    color: 'rgba(52, 137, 255, 1)',
                }
            }
        },
        formatter: (name: string) => {
            let {percent, value} = data.find(item => item.name === name);
            return '{a|' + name + '}' + '{b|' + value + '}' + '{c|' + percent + '}'
        }

    },
    series: [
        {
            name: '统计',
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            /*emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },*/
            labelLine: {
                show: false
            },
            data: data
        }
    ]

};
