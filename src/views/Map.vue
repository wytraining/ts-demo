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
        cluster1: any = {}; //聚集点位
        infoWindow: any = {}; //弹窗

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
                // mapStyle: "amap://styles/c72a556f21968187491edf8de3b2dbe0", //底图样式
            });
            this.map.on('click', this.showInfoClick);
        }

        showInfoClick(e:any){
            if(e){
                this.infoWindow.close()
            }
        }

        // 实例化点标记
        addMarker() {
            this.marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [116.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30)
            });
            this.marker.setMap(this.map);

            this.marker.content = { //弹窗内容
                id: '001',
                color: 'red',
                name: '单点位1',
                lng: '116.406315',
                lat: '39.908775'
            };
            this.marker.on('click', this.addInfoWindow);//打开弹窗
        }

        //聚集点位
        addCluster() {
            const vm = this;
            let marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [116.906315, 39.908775],
                offset: new AMap.Pixel(-13, -30),
                id:'c1'
            });
            let marker2 = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [117.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30),
                id:'c2'
            });
            let marker3 = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [118.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30),
                id:'c3'
            });
            let marker4 = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: [119.406315, 39.908775],
                offset: new AMap.Pixel(-13, -30),
                id:'c4'
            });

            this.pointList.push(marker, marker2, marker3, marker4);
            this.pointList.forEach((item: any, index: number) => {
                item.content = { //弹窗内容
                    id: '001',
                    color: 'red' + (index+1),
                    name: '聚集点位a' + (index+1)
                };
                item.on('click', vm.addInfoWindow);//打开弹窗
            });

            let lnglats = [
                [116.368904, 39.923423],
                [116.382122, 39.921176],
                [116.387271, 39.922501],
                [116.398258, 39.914600]
            ];
            let arr:any = [];
            lnglats.forEach((item: any, index: number) => {
                let marker: any = {};
                marker = new AMap.Marker({
                    position: item
                });
                marker.content = { //弹窗内容
                    id: '001',
                    color: 'red' + (index+1),
                    name: '聚集点位b' + (index+1)
                };
                arr.push(marker);
                marker.on('click', vm.addInfoWindow);//打开弹窗
            });

            //自定义聚集图标
            let sts = [
                /*{
                    url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
                    size: new AMap.Size(32, 32),
                    offset: new AMap.Pixel(-16, -16)
                }, {
                    url: "https://a.amap.com/jsapi_demos/static/images/green.png",
                    size: new AMap.Size(32, 32),
                    offset: new AMap.Pixel(-16, -16)
                }, {
                    url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
                    size: new AMap.Size(36, 36),
                    offset: new AMap.Pixel(-18, -18)
                }, {
                    url: "https://a.amap.com/jsapi_demos/static/images/red.png",
                    size: new AMap.Size(48, 48),
                    offset: new AMap.Pixel(-24, -24)
                },*/ {
                    url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
                    size: new AMap.Size(48, 48),
                    offset: new AMap.Pixel(-24, -24)
                }
            ];

            vm.map.plugin(["AMap.MarkerClusterer"], function () {
                vm.cluster = new AMap.MarkerClusterer(
                    vm.map,
                    vm.pointList,
                    {maxZoom: 18}
                );
                vm.cluster1 = new AMap.MarkerClusterer(
                    vm.map,
                    arr,
                    {styles: sts,}, //自定义图标
                    {maxZoom: 18}
                );
            })
        }

        //弹窗
        addInfoWindow(e: any) {
            console.log(e);
            //构建信息窗体中显示的内容
            var info = [];
            info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
            info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>高德软件</h4>");
            info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
            info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");
            info.push("<p style=\"color: red\">color："+ e.target.content.color+"</p>");
            info.push("name：" + e.target.content.name);

            this.infoWindow = new AMap.InfoWindow({
                content: info.join(""),  //使用默认信息窗体框样式，显示信息内容
                offset: new AMap.Pixel(5, -15)
            });

            // this.infoWindow.setContent(e.target.content);
            // this.infoWindow.open(this.map, this.map.getCenter()); //中心经纬度
            this.infoWindow.open(this.map, [e.lnglat.lng,e.lnglat.lat]); //点位经纬度
        }

        //销毁
        beforeDestory(){
            this.map.off('click', this.showInfoClick);
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