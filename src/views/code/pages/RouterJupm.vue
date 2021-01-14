<template>
    <div class="router-jump">
        <p><Button @click="goDetail">跳转</Button></p>

<!--        <img src="../../../assets/test/logo.png" alt="">-->
        <img src="../../../assets/codeManage/test.gif" alt="">

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class RouterJupm extends Vue {

        goDetail() {
            this.$router.push({
                name: 'detail',
                params: {
                    id: '222',
                    name: 'zs'
                }
            })
        }

    }
</script>

<style lang="scss" scoped>
    .router-jump {
        padding: 20px;
    }
</style>
