<template>
    <div class="scroll">

        <vue-seamless-scroll :data="listData"  class="seamless-warp">
            <ul class="item">
                <li v-for="item in listData">
                    <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
                </li>
            </ul>
        </vue-seamless-scroll>

    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Scroll extends Vue {

        listData: Array<any> = [
            {
                'title': '无缝滚动第一行无缝滚动第一行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第二行无缝滚动第二行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第三行无缝滚动第三行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第四行无缝滚动第四行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第五行无缝滚动第五行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第六行无缝滚动第六行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第七行无缝滚动第七行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第八行无缝滚动第八行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第九行无缝滚动第九行',
                'date': '2017-12-16'
            }, {
                'title': '无缝滚动第十行无缝滚动第十行',
                'date': '2017-12-16'
            }
        ]

    }
</script>

<style lang="scss" scoped>

    .seamless-warp {
        width: 300px;
        height: 300px;
        line-height: 30px;
        background-color: gainsboro;
        overflow: hidden;
        /*margin: 0 auto;
        text-align: center;*/
    }

</style>
