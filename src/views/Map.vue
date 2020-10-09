<template>
    <suc-map
            ref="mapObject"
            :options="olMap.map"
            v-bind.sync="olMap.map.view"
            @singleclick="clickFeature"
            @singleclick-blank="clickBlank"
    >
        <template v-for="layer in olMap.baseLayer">
            <ol-layer :options="layer"></ol-layer>
        </template>


        <!--矢量图层-->
        <!--<ol-layer :options="layers">
            <template v-slot="feature">
                <ol-overlay v-if="feature.select"
                            :position="feature.select.coord"
                            category="clickLabel">
                    <div class="featureClick" style="top: -8px">
                        <div class="pop-title">
                            <span class="nowrap">{{feature.select.NAME}}</span>
                        </div>
                        <div class="pop-content">
                            <div>
                                <label>名称：</label>
                                <span>{{feature.select.NAME}}</span>
                            </div>
                            <div>
                                <label>所属省：</label>
                                <span>{{feature.select.所属省}}</span>
                            </div>
                        </div>
                    </div>
                </ol-overlay>
            </template>
        </ol-layer>-->


        <!--点位-->
        <!--<ol-markers>
            <template v-for="marker in markers">
                <ol-marker :options="marker">
                    <template v-slot="{selectPoint}">
                        <ol-overlay class="marker-overlay" v-if="selectPoint"
                                    :position="selectPoint.coord"
                                    category="clickLabel">
                            <building-overlay :data="selectPoint.info">
                            </building-overlay>
                        </ol-overlay>
                    </template>
                </ol-marker>
            </template>
        </ol-markers>-->


        <!--聚集-->
        <ol-cluster :points="building.points" :cluster-style="building.clusterStyle"
                    :point-style="building.pointStyle"
                    :select-point-id.sync="building.activeListId">
            <template v-slot="{selectFeature}">
                <ol-overlay class="marker-overlay" v-if="selectFeature"
                            :position="selectFeature.coords"
                            category="clickLabel">
                    <info-overlay :data="selectFeature.info"></info-overlay>
                </ol-overlay>
            </template>
        </ol-cluster>


    </suc-map>
</template>
<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    // import { Service } from "@suc/module";
    // import { TestService } from "@/utils/TestService";

    @Component
    export default class mapView extends Vue {
        olMap: any = this.$getMapConfig();

        //矢量图层
        layers: any = {
            name: "zj",
            source: {
                type: "EsriJSON",
                url: "mapJson/杭州市_FeaturesToJSON.json",
                local: true,
                style: function(f:any) {
                    let arr = ["#205c8a", "#3487b6", "#3487b6", "#4cc3fa", "#42a6d5"]
                    return {
                        fill: {
                            color: arr[Math.round(Math.random() * 4)]
                        },
                        stroke: {
                            width: 1,
                            color: "#000"
                        },
                        text: {
                            text: f.get("NAME"),
                            fill: {
                                color: "#fff"
                            }
                        }
                    }
                },
                clickStyle: function(f:any) {
                    return {
                        fill: {
                            color: "red"
                        },
                        text: {
                            text: f.get("NAME"),
                            fill: {
                                color: "#fff"
                            }
                        }
                    }
                },
                moveStyle: function(f:any) {
                    return {
                        fill: {
                            color: [255, 0, 0, .6]
                        },
                        text: {
                            text: f.get("NAME"),
                            fill: {
                                color: "#fff"
                            }
                        }
                    }
                }
            },
            onLayerCreated: function(feature:any) {
                //回调函数，返回图层对象
                console.log(feature);
            }
        };


        //点位
        markers: any = [
            {
                "id": "building1",
                "lon": 120,
                "lat": 30,
                "name": "浙大网新A幢",
                "info": {
                    "mc": "浙大网新A幢",
                    "dscs": 20,
                    "jzmj": 900,
                    "wz": "西园一路"
                },
                "style": {
                    "image": {
                        "icon": {
                            "anchor": [
                                0.5,
                                1
                            ],
                            "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAyCAYAAADBcfKuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3ODZBQjAyNENBRTMxMUU4ODY1OThDQUVGNjVBN0JCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3ODZBQjAyNUNBRTMxMUU4ODY1OThDQUVGNjVBN0JCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4NkFCMDIyQ0FFMzExRTg4NjU5OENBRUY2NUE3QkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc4NkFCMDIzQ0FFMzExRTg4NjU5OENBRUY2NUE3QkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iXr+IgAABw5JREFUeNrMmXtsU1UY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"
                        }
                    }
                }
            },
            {
                "id": "building2",
                "lon": 119.5,
                "lat": 30,
                "name": "浙大网新A幢",
                "info": {
                    "mc": "浙大网新A幢",
                    "dscs": 20,
                    "jzmj": 900,
                    "wz": "西园一路"
                },
                "style": {
                    "image": {
                        "icon": {
                            "anchor": [
                                0.5,
                                1
                            ],
                            "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAyCAYAAADBcfKuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3ODZBQjAyNENBRTMxMUU4ODY1OThDQUVGNjVBN0JCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3ODZBQjAyNUNBRTMxMUU4ODY1OThDQUVGNjVBN0JCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4NkFCMDIyQ0FFMzExRTg4NjU5OENBRUY2NUE3QkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc4NkFCMDIzQ0FFMzExRTg4NjU5OENBRUY2NUE3QkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iXr+IgAABw5JREFUeNrMmXtsU1UY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"
                        }
                    }
                }
            }
        ];

        //聚集
        building: any = {
            //聚集
            clusterStyle: {
                image: {
                    icon: {
                        anchor: [
                            0.5,
                            1
                        ],
                        // src: "buildingMap2"
                        // "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAASCAYAAABvqT8MAAAABHNCSVQICAgIfAhkiAAAAW5JREFUKFN9k8F1E0EQRH/pYh/FAawbdgSIDKQMTAQWEVgTASaClSLAGWBHYIUgImB9W9kHxE0Xq/x60IjV2jDv7dvdma7q7uoasVv9yv3jHpeYCXBqWAtunsz8MWlZ4hQfbysPe+JO0C8HB2/zuUm6jj0F85H4eRBs7hHvO6Bxk7TQoPIV4ksc2vzewihKyESwkPiwA9bNVGcBqAubzXyVNC3Mg8ojxF35fzIfNZjZ+9Tma5N09S8AZqyTysuSNpTZmnEp6Vh8B0aFYGPeREkTxLd2g4alYHiwZ25XSedZ1naWV2XNinDWJNUZ0G3uBajVWwbssswkLrvBNj9WSfvy9oBsDVh2BxZSvrDGf2Q8kDlbo1vCoPI14gJzv4HhOmndjilNh7QXG/MpDo+gNkwekm5OKs/U49dmyzzAMYc8fptbwTSke1f5PIJ3CmavFdv8cetfk9VAPHkZ+jHAtin3PeQ7AaNX7sQibF1IngFh6rB6CMRzgQAAAABJRU5ErkJggg=="
                        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAYAAAD+vg1LAAAABHNCSVQICAgIfAhkiAAAAi1JREFUSEu11T9oE1EcB/Df795LLxcTvUiLIIJSFxcxnVwKVrSDiwb/NDilSqsiDk0tVCiIgtIKRYLgoCmSTlqXZHHRQik4uoi4uJjOrSY1zb3m7t795AWuhGJL2ztvu+E+73vf93t3CHu83n+spgjdLCGmESCXOd9ZbqdwN25poWo2pZdF8gYBMUVAXxHwlDIQ4cbAuc6i7+0InptfSQNAFgDSCtMQ8xGNldddN6UhLmyEI3qc6e961Fpoq8T+qwLiIAEtAWlF4lr5+tlkxX/m7aflvk3wYqa/q29b+N38Sh4IKwr78kO/7RI/HTXkw2dZ43Mg+EHByqzZbPx3g59ctzWuMM6IDiedUv6OfkXd7zjx+KzobQotV22wC3XBDKNDyoQhK3XBjgmbMT9p9yGRmx6O5beFJ2bEUeHhRK3BrtUa3FSYGZPfErqcmhqOzSns5nOnVrP4gV3Bl58Q/QtTiKpD4XuGjxxsLr64G23t5v1X1qRls6u/1iLH47r882Y0YgaGByYluVLbmEAz5q6GAqtalJqIuk486n03dDmrNilw4rHXYobpUGyf1UCb197xWMEacSS/WBfYAwQYShX/vWM1fvt0ubzf8D5M3zKGgndcsEZ0xNLTIWOp/eMUGFan0NHwkm3jGdHEE5yR/fKe3hMY9sfNTxv6HHPmQVz3Vo0O72coiVUVm/sNZY7VAXE81u1X4bqUDCVx0I4JoIKIrR8qKsw/eUHh9hH9C0ysY1lSU0ZGAAAAAElFTkSuQmCC"
                    }
                },
                text: {
                    //聚集个数
                    text: "",
                    fill: {
                        color: "red"
                    },
                    font: "24px sans-serif",
                    offsetY: -20,
                    offsetX: 10
                }
            },
            //单点位
            pointStyle: {
                image: {
                    icon: {
                        anchor: [
                            1,
                            10
                        ],
                        // src: "buildingMap"
                        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAASCAYAAABvqT8MAAAABHNCSVQICAgIfAhkiAAAAW5JREFUKFN9k8F1E0EQRH/pYh/FAawbdgSIDKQMTAQWEVgTASaClSLAGWBHYIUgImB9W9kHxE0Xq/x60IjV2jDv7dvdma7q7uoasVv9yv3jHpeYCXBqWAtunsz8MWlZ4hQfbysPe+JO0C8HB2/zuUm6jj0F85H4eRBs7hHvO6Bxk7TQoPIV4ksc2vzewihKyESwkPiwA9bNVGcBqAubzXyVNC3Mg8ojxF35fzIfNZjZ+9Tma5N09S8AZqyTysuSNpTZmnEp6Vh8B0aFYGPeREkTxLd2g4alYHiwZ25XSedZ1naWV2XNinDWJNUZ0G3uBajVWwbssswkLrvBNj9WSfvy9oBsDVh2BxZSvrDGf2Q8kDlbo1vCoPI14gJzv4HhOmndjilNh7QXG/MpDo+gNkwekm5OKs/U49dmyzzAMYc8fptbwTSke1f5PIJ3CmavFdv8cetfk9VAPHkZ+jHAtin3PeQ7AaNX7sQibF1IngFh6rB6CMRzgQAAAABJRU5ErkJggg=="
                    }
                }
            },
            points: [
                {
                    id: "2c92d0b867a0671d0167a0e5d35f0000",
                    lon: 119.124755859375,
                    lat: 26.169433593750004,
                    name: "测试建筑",
                    info: {
                        id: "2c92d0b867a0671d0167a0e5d35f0000",
                        mc: "测试建筑",
                        jzgd: "120",
                        jzmj: null,
                        lg: 119.124755859375,
                        la: 26.169433593750004,
                        kssj: 1544716800000,
                        province: {
                            id: "2c92e2c266ed329e0166ed3713250000",
                            code: "ac959f97-9966-4199-9e94-954c8b08fe2c",
                            name: "浙江省",
                            parentCode: "-1"
                        },
                        city: {
                            id: "2c92e2c266ed329e0166ed37e25f0001",
                            code: "2f54c464-a563-40c5-8035-679d6600a6cc",
                            name: "杭州市",
                            parentCode: "ac959f97-9966-4199-9e94-954c8b08fe2c"
                        },
                        county: {
                            id: "2c92e2c266ed329e0166ed3c86230002",
                            code: "96c2f06e-9d9d-47cf-bd12-0cabf2dc7ee4",
                            name: "上城区",
                            parentCode: "2f54c464-a563-40c5-8035-679d6600a6cc"
                        },
                        wz: "测试地址",
                        address: "浙江省杭州市上城区测试地址",
                    }
                },
                {
                    id: "2c92d0b867637c8a01676399941f0002",
                    lon: 119.31289672851562,
                    lat: 26.080169677734375,
                    name: "新加一个建筑",
                    info: {
                        id: "2c92d0b867637c8a01676399941f0002",
                        mc: "新加一个建筑",
                        jzgd: "125",
                        jzmj: null,
                        lg: 119.31289672851562,
                        la: 26.080169677734375,
                        kssj: 1543507200000,
                        province: {
                            id: "2c92e2c266ed329e0166ed3713250000",
                            code: "ac959f97-9966-4199-9e94-954c8b08fe2c",
                            name: "浙江省",
                            parentCode: "-1"
                        },
                        city: {
                            id: "2c92e2c266ed329e0166ed37e25f0001",
                            code: "2f54c464-a563-40c5-8035-679d6600a6cc",
                            name: "杭州市",
                            parentCode: "ac959f97-9966-4199-9e94-954c8b08fe2c"
                        },
                        county: {
                            id: "2c92e2c266ed329e0166ed3c86230002",
                            code: "96c2f06e-9d9d-47cf-bd12-0cabf2dc7ee4",
                            name: "上城区",
                            parentCode: "2f54c464-a563-40c5-8035-679d6600a6cc"
                        },
                        wz: "新家一个地址",
                        address: "浙江省杭州市上城区新家一个地址",
                    }
                },
            ],
            activeListId: "2c92d0b867a0671d0167a0e5d35f0000"
        };


        // @Service(TestService)
        // test!: TestService;

        //点击图标
        clickFeature(params: any) {
            console.log(params);
            /*let aa = params.feature.get("featureInfo").data;
            let bb = params.feature.values_.featureInfo.data;*/

            let cc = params.feature.get("features")[0].get("featureInfo").data.info;

            /*console.log(aa);
            console.log(bb);*/
            console.log(cc);
        }

        //点击空白处
        clickBlank() {
            console.log(2);
        }


        created() {
        }
    }
</script>
