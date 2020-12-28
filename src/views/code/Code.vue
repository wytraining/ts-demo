<template>
    <div class="code">

        <Menu class="side-menu-container" :active-name="activeNav" :open-names="['1']">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"/>内容管理
                </template>
                <MenuItem name="articleManage" to="/main/code/articleManage">列表</MenuItem>
                <MenuItem name="commentsManage" to="/main/code/commentsManage">vuex/自定义指令</MenuItem>
                <MenuItem name="rule" to="/main/code/rule">权重</MenuItem>
                <MenuItem name="drag" to="/main/code/drag">拖拽</MenuItem>
                <MenuItem name="promise" to="/main/code/promise">promise</MenuItem>
                <MenuItem name="language" to="/main/code/language">language</MenuItem>
                <MenuItem name="routerJupm" to="/main/code/routerJupm">路由跳转</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people"/>用户管理
                </template>
                <MenuItem name="2-1">新增用户</MenuItem>
                <MenuItem name="2-2">活跃用户</MenuItem>
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
