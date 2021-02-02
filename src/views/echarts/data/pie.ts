// 圆环：占比
const num = 75;
const color = 'red';

export const pieOptions = {
    title: {
        text: "圆环：占比"
    },
    series: {
        type: 'pie',
        clockWise: false,
        radius: ['70%', '72%'],
        hoverAnimation: false,
        silent: true,
        center: ['50%', '50%'],
        itemStyle: {
            normal: {
                labelLine: {
                    show: false,
                }
            }
        },
        data: [
            {
                value: num,
                label: {
                    normal: {
                        show: true,
                        position: "center",
                        // formatter: "{c}%",
                        formatter: num + '%',
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#1b2845"
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#139FBE',
                        borderWidth: 5,
                        borderColor: color
                    }
                }
            },
            {
                value: 100 - num,
                itemStyle: {
                    normal: {
                        color: '#c4c4c4'
                    }
                }
            }
        ]
    }
};