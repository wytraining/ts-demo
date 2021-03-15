//水球图
// export const liquidFill = {
//     title: {
//         text: '基本水球图'
//     },
//     series: [{
//         type: 'liquidFill',
//         data: [0.6]
//     }]
// };

export const liquidFill ={
    series: [
        {
            type: 'liquidFill',
            data: [0.1],
            label: {
                normal: {
                    textStyle: {
                        color: '#333',
                        fontSize: 20
                    }
                }
            },
            outline: { //外圈
                show: true,
                borderDistance: 6,
                itemStyle: {
                    color: 'none',
                    borderColor: '#86e5ac',
                    borderWidth: 6,
                    shadowBlur: 0,
                    shadowColor: 'rgba(0, 0, 0, 0)'
                }
            },
            backgroundStyle: { //水球空白色
                color: '#ffffff'
            },
            itemStyle: { //水球
                color: '#86e5ac'
            },
            radius: '60%',
            center: ['50%', '50%'],

        }
    ],
};