<template>
    <div>
        我是son3：{{name1}} / {{name2}}
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Son3 extends Vue {

        name1: string = "";
        name2: string = "";

        mounted() {
            this.$Bus.$on('son1', (name: string) => {
                this.name1 = name;
            });

            this.$Bus.$on('son2', (name: string) => {
                this.name2 = name;
            })
        }

    }
</script>

<style lang="scss" scoped>

</style>

