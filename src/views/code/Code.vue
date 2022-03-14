<template>
    <div class="code">

        <Menu class="side-menu-container" :active-name="activeNav" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"/>内容管理
                </template>
                <MenuItem name="articleManage" to="/main/code/articleManage">列表</MenuItem>
                <MenuItem name="articleManage2" to="/main/code/articleManage2">列表(ts规范)</MenuItem>
                <MenuItem name="commentsManage" to="/main/code/commentsManage">vuex/自定义指令</MenuItem>
                <MenuItem name="rule" to="/main/code/rule">权重</MenuItem>
                <MenuItem name="drag" to="/main/code/drag">拖拽</MenuItem>
                <MenuItem name="promise" to="/main/code/promise">promise</MenuItem>
                <MenuItem name="language" to="/main/code/language">language</MenuItem>
                <MenuItem name="changeColor" to="/main/code/changeColor">一键换肤</MenuItem>
                <MenuItem name="routerJupm" to="/main/code/routerJupm">路由跳转</MenuItem>
                <MenuItem name="exportWord" to="/main/code/exportWord">导出word</MenuItem>
                <MenuItem name="classDemo" to="/main/code/classDemo">class</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people"/>vue
                </template>
                <MenuItem name="busDemo" to="/main/code/busDemo">组件通信（bus）</MenuItem>
                <MenuItem name="computed" to="/main/code/computed">computed</MenuItem>
            </Submenu>
        </Menu>

        <div class="main">
            <router-view></router-view>
        </div>


    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Code extends Vue {

        activeNav: string = "";

        mounted() {
            this.activeNav = this.$route.matched[2].meta.name;
        }

    }
</script>

<style lang="scss" scoped>
    .code {
        height: 100%;

        .side-menu-container {
            height: 100%;
            background-color: #fff;
            width: 200px !important;
            float: left;
        }

        .main {
            width: calc(100% - 200px);
            height: 100%;
            float: right;
        }
    }
</style>
