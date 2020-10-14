<template>
    <div class="map">
        <div id="mapContainer"></div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    declare let AMap: any;

    @Component({
        components: {}
    })
    export default class Map2 extends Vue {

        map: any = {}; //底图
        marker: any = {}; //单点位
        cluster: any = {}; //聚集点位

        pointList: Array<any> = []; //点位数组

        async mounted() {
            await this.initMap(); //初始化地图
            await this.addMarker(); //实例化点标记
            await this.addCluster(); //聚集点位
        }

        //初始化地图
        initMap() {
            this.map = new AMap.Map('mapContainer', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 8, //初始化地图层级
                center: [116.397428, 39.90923], //初始化地图中心点

            });
        }

        // 实例化点标记
        addMarker() {
            this.marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [116.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });
            this.marker.setMap(this.map);
        }

        //聚集点位
        addCluster() {
            const vm = this;
            let marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [116.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });
            let marker2 = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [117.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });
            let marker3 = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [118.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });
            let marker4 = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [119.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });

            this.pointList.push(marker, marker2, marker3, marker4);

            vm.map.plugin(["AMap.MarkerClusterer"], function () {
                vm.cluster = new AMap.MarkerClusterer(
                    vm.map,
                    vm.pointList,
                    {maxZoom: 14} /*{styles:sts}*/
                );
            })
        }


    }
</script>

<style lang="scss" scoped>
    .map {
        width: 100%;
        height: 100%;

        #mapContainer {
            width: 100%;
            height: 100%;
        }

    }
</style>