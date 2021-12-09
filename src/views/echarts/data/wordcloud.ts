// 词云
export const wordcloudOptions = {
    series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,
        sizeRange: [18, 60],
        rotationRange: [0, 0], // 字体旋转角度
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            normal: {
                color: function () {
                    // 生成随机的颜色
                    return `rgb(${[
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                    ].join(',')})`

                    /*// 从指定的数组中生成随机的颜色
                    const colorArr = ['#079087', '#6D8DCE', '#349029', '#39C8BE', '#16439D']
                    const index = Math.floor((Math.random() * colorArr.length))
                    return colorArr[index]*/
                },


            },
        },
        emphasis: {
            focus: 'self',
            textStyle: {
                textShadowBlur: 10,
                textShadowColor: '#333',
            },
        },
        data: [
            {
                name: '工控主机',
                value: 6181,
            },
            {
                name: '工控主机',
                value: 4386,
            },
            {
                name: '工控主机',
                value: 4055,
            },
            {
                name: '工控主机',
                value: 2467,
            },
            {
                name: '工控主机',
                value: 3264,
            },
            {
                name: '工控主机',
                value: 2467,
            },
            {
                name: '工控主机',
                value: 3264,
            },
        ],
    }],
};
