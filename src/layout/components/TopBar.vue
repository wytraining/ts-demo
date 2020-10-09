<template>
    <div class="header_bar">
        <Menu mode="horizontal"
              theme="primary"
              :active-name="activeNav">
            <MenuItem name="code"
                      to="/main/code">
                <Icon type="ios-map"/>
                <span>menuDemo</span>
            </MenuItem>
            <MenuItem name="editor"
                      to="/main/editor">
                <Icon type="ios-map"/>
                <span>editorDemo</span>
            </MenuItem>
            <MenuItem name="scroll"
                      to="/main/scroll">
                <Icon type="ios-map"/>
                <span>scrollDemo</span>
            </MenuItem>
            <MenuItem name="echarts"
                      to="/main/echarts">
                <Icon type="ios-map"/>
                <span>echartsDemo</span>
            </MenuItem>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="md-person"/>
                    <span>admin</span>
                </template>
                <MenuItem name="3-1">
                    <span @click="logout">注销登录</span>
                </MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import { Menu, MenuItem, Icon } from "iview";

    //@ts-ignore
    const Submenu = Menu.Sub;

    @Component({
        components: {
            Menu,
            MenuItem,
            Submenu,
            Icon
        }
    })
    export default class topBar extends Vue {
        activeNav: string = "";

        mounted() {
            this.activeNav = this.$route.matched[1].meta.name;
        }

        logout() {
            this.$http
                .get("/logout")
                .then(res => {
                    this.$router.push("/login");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
</script>
