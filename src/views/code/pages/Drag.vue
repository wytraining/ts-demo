<template>
    <div class="drag">
        <div class="color-list">
            <div class="color-item"
                 v-for="(item, index) in colorList"
                 :style="{backgroundColor: item.color}"
                 v-dragging="{ item: item, list: colorList, group: 'color' }"
                 :key="item.text">{{index+1}}-{{item.text}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Drag extends Vue {

        colorList: Array<any> = [
            {color: 'red', text: 'red'},
            {color: 'Aquamarine', text: 'Aquamarine'},
            {color: 'Hotpink', text: 'Hotpink'},
            {color: 'Gold', text: 'Gold'},
            {color: 'Crimson', text: 'Crimson'},
            {color: 'Blueviolet', text: 'Blueviolet'},
            {color: 'Lightblue', text: 'Lightblue'},
            {color: 'Cornflowerblue', text: 'Cornflowerblue'},
            {color: 'Skyblue', text: 'Skyblue'},
            {color: 'Burlywood', text: 'Burlywood'},
        ];

        mounted () {
            //拖拽过程中一直触发
            //@ts-ignore
            this.$dragging.$on('dragged', ({ value }) => {
                console.log(value);
                console.log(value.item);
                console.log(value.list);
            });

            //拖拽结束后触发
            //@ts-ignore
            this.$dragging.$on('dragend', (res) => {
                console.log(res);
                console.log(this.colorList);
            });


        }

    }
</script>

<style lang="scss" scoped>

</style>
