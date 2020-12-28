<template>
    <div class="language">
        22222222
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class RouterDetail extends Vue {

        created() {
            console.log(this.$route);
        }



    }
</script>

<style lang="scss" scoped>

</style>
