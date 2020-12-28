<template>
    <div class="router-jump">
        <Button @click="goDetail">跳转</Button>
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

</style>
