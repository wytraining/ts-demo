<template>
    <div class="rule">

        <div>
            <span>当前综合评分规则</span>
        </div>
        <div>
            (Ga)：Ga=<i>{{weight.Gt.percent}}</i>*Gt+<i>{{weight.Gc.percent}}</i>*Gc+<i>{{weight.Gs.percent}}</i>*Gs+
            <i>{{weight.Gn.percent}}</i>*Gn+<i>{{weight.Gf.percent}}</i>*Gf
        </div>
        <div class="score-rule">
            <label>评分权重</label>
            <div>
                <div class="weight-bar">
                    <div :key="item.name" :style="item.style" v-for="(item,name) in weight">
                        <span @click="clickSpan(item, name)" v-if="!item.isEdit">{{item.percent}}</span>
                        <Input :ref="'input'+name" v-else v-model.number="item.percent"
                                   @on-blur="blurInput(item)"/>
                    </div>
                </div>
                <div class="weight-line">
                    <span>0</span>
                    <span>1</span>
                </div>
                <div class="weight-legend">
                    <div class="weight-legend-item" :key="item.name" v-for="item in weight">
                        <i :style="{opacity:item.opacity}"></i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    interface WeightItem {
        name: string,     //名称
        opacity: number,  //颜色透明度
        percent: number,  //比例 0-1
        style: { width: string, background: string },  //样式
        isEdit: boolean
    }

    type Keys = 'Gt' | 'Gc' | 'Gs' | 'Gn' | 'Gf';

    @Component({
        components: {}
    })
    export default class Rule extends Vue {

        weight = {
            'Gt': {
                name: '时间权重',
                opacity: 0.1,
                percent: 0.2,
                style: {
                    width: "20%",
                    background: 'rgba(2,228,254,.1)'
                },
                isEdit: false
            },
            'Gc': {
                name: '完成度权重',
                opacity: 0.3,
                percent: 0.2,
                style: {
                    width: "20%",
                    background: 'rgba(2,228,254,.3)'
                },
                isEdit: false
            },
            'Gs': {
                name: '能耗权重',
                opacity: 0.5,
                percent: 0.2,
                style: {
                    width: "20%",
                    background: 'rgba(2,228,254,.5)'
                },
                isEdit: false
            },
            'Gn': {
                name: '资源损耗权重',
                opacity: 0.7,
                percent: 0.2,
                style: {
                    width: "20%",
                    background: 'rgba(2,228,254,.7)'
                },
                isEdit: false
            },
            'Gf': {
                name: '外部因素权重',
                opacity: 0.9,
                percent: 0.2,
                style: {
                    width: "20%",
                    background: 'rgba(2,228,254,.9)'
                },
                isEdit: false
            }
        };

        clickSpan(item: WeightItem, name: Keys) {
            item.isEdit = true;
            const nm = 'input' + name;
            this.$nextTick(() => {
                (this.$refs[nm] as any)[0].focus();
            })
        }

        blurInput(item: WeightItem) {
            item.isEdit = false;
            if(!item.percent) {
                item.percent = 0;
            }
            let total = 0;
            let keys: Keys[] = ['Gt', 'Gc', 'Gs', 'Gn', 'Gf'];
            for (let i = 0; i < keys.length; i++) {
                let w = this.weight[keys[i]];
                total += w.percent * 10;
            }
            if (total > 10) {
                this.$Message.warning('总和不能大于1');
                item.percent = (10 - (total - item.percent * 10)) / 10;
            }
            this.normalizeWeight();
        }

        normalizeWeight() {
            let length = 0;
            let keys: Keys[] = ['Gt', 'Gc', 'Gs', 'Gn', 'Gf'];
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let item = this.weight[key];
                if (item.percent === 0) {
                    length += 14;
                }
            }

            for (let i = 0; i < keys.length; i++) {
                let w = this.weight[keys[i]];
                w.style.width = "calc(" + w.percent * 100 + "% - " + (length * w.percent) + "px)";
            }

        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/variables";
    $deep: '::v-deep';
    .rule {
        height: 100%;
        padding: 10px;

        .score-cur {
            height: 163px;
            margin: 20px 20px 15px;
            padding: 15px 26px;
            background-color: rgba($theme-primary-dark, .7);

            > div:first-child {
                span {
                    color: $theme-text-active;
                }

                a {
                    float: right;
                    color: $theme-text-link;

                    img {
                        margin-right: 4px;
                        vertical-align: -2px;
                    }
                }
            }

            > div:nth-child(2) {
                margin: 10px 0;

                i {
                    font-style: normal;
                    color: $theme-text-link;
                }
            }

            .score-rule {
                font-size: 14px;

                label {
                    color: $theme-text-link;
                    vertical-align: top;
                }

                > div {
                    display: inline-block;
                    width: calc(100% - 90px);
                    margin-left: 30px;
                }
            }
        }

        .weight-bar {
            height: 25px;
            line-height: 25px;
            background-color: rgba($theme-text-primary, .2);
            border-bottom: 1px solid rgba($theme-text-primary, .5);

            > div {
                display: inline-block;
                min-width: 14px;
                height: 100%;
                text-align: center;
                background-color: $theme-text-link;
                vertical-align: top;
            }

            #{$deep} .ivu-input {
                width: 44px;
                height: 24px;
                line-height: 24px;
                padding: 0 0 0 6px;
            }
        }

        .weight-line {
            span:nth-child(2) {
                float: right;
            }
        }

        .weight-legend {
            margin-top: 5px;

            .weight-legend-item {
                display: inline-block;
                margin-right: 20px;

                i {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    margin-right: 10px;
                    background-color: $theme-text-link;
                    vertical-align: -3px;
                }
            }
        }


    }
</style>
