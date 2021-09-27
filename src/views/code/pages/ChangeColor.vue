<!-- 页面组件配置换肤 -->
<template>
    <div :data-theme="dataTheme">
        <div class="change-color">
            <Button @click="changeColor">切换</Button>
            <div class="box">
                123
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
type DataTheme = "light-theme" | "dark-theme"

// enum DataTheme2 {
//     'light-theme',
//     'dark-theme'
// }

@Component({
    components: {}
})
export default class Language extends Vue {

    dataTheme: DataTheme = "dark-theme";
    // dataTheme2: DataTheme2 = DataTheme2["dark-theme"];

    changeColor() {
        this.dataTheme = this.dataTheme === "dark-theme" ? 'light-theme' : 'dark-theme'

    }
}
</script>

<style lang="scss">
.change-color {
    padding: 10px 20px;

    //.box {
    //  @include base-background();
    //  @include base-color();
    //}

    .box {
        @include set-theme {
            color: get-color-variable('base-color');
            background: get-color-variable('background-color');
        }

        color: red;
    }

}
</style>
