<template>
    <div class="rule">
        <p>规则</p>
        <p>GA={{GA.g1.value}}+{{GA.g2.value}}+{{GA.g3.value}}+{{GA.g4.value}}+{{GA.g5.value}}</p>
        <div class="weight" :key="render">
            <div v-for="(item, index) in GA" :style="item.style">
                <Input v-model="item.value" @on-blur="blurInput(item)"/>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Rule2 extends Vue {

        render: number = 0;
        GA: any = {
            g1: {
                value: 0.2,
                style: {
                    width: '20%',
                    background: 'red'
                }
            },
            g2: {
                value: 0.2,
                style: {
                    width: '20%',
                    background: 'yellow'
                }
            },
            g3: {
                value: 0.2,
                style: {
                    width: '20%',
                    background: 'forestgreen'
                }
            },
            g4: {
                value: 0.2,
                style: {
                    width: '20%',
                    background: '#247ad6'
                }
            },
            g5: {
                value: 0.2,
                style: {
                    width: '20%',
                    background: 'pink'
                }
            },

        };

        blurInput(item: any) {

            //单个的权重为空
            if(!item.value || item.value == 0) {
                item.value = 0;
                item.style.width = "30px";
                return
            }

            //总权重大于1
            let total = 0;
            let GA = this.GA;
            for (let key in GA) {
                let gaItem = GA[key];
                total += Number(gaItem.value);
                if(total > 1) {
                    item.value = 1 - (total - item.value); //设置成最大值
                    this.$Message.error("权重不能大于1");
                    this.render = new Date().getTime();
                    return;
                }
            }

            item.style.width = item.value*100+'%';
            // item.style.width = 'calc('+item.value*100+'%-' + item.value*length+'px)';

            console.log(item.style.width);

            this.render = new Date().getTime();

        }

    }
</script>

<style lang="scss" scoped>
    .rule {
        height: 100%;
        padding: 10px;

        ::v-deep.weight {
            width: 800px;
            height: 30px;
            display: flex;
            background: rgba(#ccc, 0.3);

            >div {
                .ivu-input-wrapper {
                    .ivu-input {
                        background: transparent !important;
                        border: none;
                        text-align: center;
                    }
                }

            }
        }

    }
</style>
