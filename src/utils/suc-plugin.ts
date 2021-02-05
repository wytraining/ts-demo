// import ECharts from 'vue-echarts';
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/scatter'
// import 'echarts/lib/chart/effectScatter'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'
import ECharts from '@/components/ECharts.vue';

//通用方法集合
const utils = {
    //时间戳转换成自定义字符串
    dateFormat: (date: any, fmt: string) => {
        let dateList: any = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in dateList) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(("" + dateList[k]).length));
            }
        }
        return fmt;
    },
    deepCopy: (obj: any) => {
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(obj[key]) {
                    if (typeof obj[key] === 'object') {
                        // @ts-ignore
                        result[key] = utils.deepCopy(obj[key]); //递归复制
                    } else {
                        // @ts-ignore
                        result[key] = obj[key];
                    }
                }else{
                    // @ts-ignore
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }
};

export const print = function (params: string|number) {
    console.log(params);
};

//地图类
class Map {
    map: any;

    constructor(common?: any) { //constructor是一个构造方法，用来接收参数
        if (common) {
            Object.assign(this, common);
        } else {
            Object.assign(this, utils.deepCopy((<any>window).mapConfig));
        }
    }

    setCenter(coords: any, projection: any) {
        if (coords instanceof Array) {
            this.map.view.center.coord = [parseFloat(coords[0]), parseFloat(coords[1])];
        }
        if (projection) {
            this.map.view.center.projection = projection;
        }
    }

    setZoom(zoom: any) {
        if (zoom) {
            this.map.view.zoom = zoom;
        }
    }

    setCenterZoom(coords: any, zoom: any, projection: any) {
        this.setCenter(coords, projection);
        this.setZoom(zoom);
    }
}

export default {
    install: (Vue: any, options: any) => {
        //时间转换过滤器
        Vue.filter('dateFormat', utils.dateFormat);

        //echarts的vue组件
        Vue.component('v-chart', ECharts);

        //将方法集添加到Vue实例上面去
        Vue.prototype.$utils = utils;

        //打印
        Vue.prototype.$print = print;

        //返回地图对象
        Vue.prototype.$getMapConfig = function (common?: any) {
            return new Map(common);
        };

        //自定义指令
        Vue.directive('pin', {
            //@ts-ignore
            bind: function (el, binding, vnode) {
                console.log(binding);
                el.style.position = 'fixed';
                el.style.top = binding.value.top + 'px';
                el.style.color = binding.value.color;
            }
        });

        //防止重复点击(防抖)
        Vue.directive('debounce', {
            bind: function (el: any, binding: any) {
                let timer: any;
                const trigger = binding.value.trigger || 'click'; // 触发方式
                const timeout = binding.value.timeout || 5000; // 触发周期
                const event = binding.value.event; // 触发事件
                el.addEventListener(trigger, () => {
                    if (timer) {
                        clearTimeout(timer)
                    }
                    timer = setTimeout(() => {
                        event()
                    }, timeout)
                })
            }
        });

        //防止重复点击(按钮灰掉)
        Vue.directive('preventReClick', {
            inserted(el: any, binding: any) {
                el.addEventListener('click', () => {
                    console.log(binding);
                    if (!el.disabled) {
                        el.disabled = true;
                        el.style.cursor = 'not-allowed';
                        el.style.pointerEvents = 'none';
                        setTimeout(() => {
                            el.disabled = false;
                            el.style.cursor = 'pointer';
                            el.style.pointerEvents = ''
                        }, binding.value || 3000)
                    }
                })
            }
        });





    }
}
