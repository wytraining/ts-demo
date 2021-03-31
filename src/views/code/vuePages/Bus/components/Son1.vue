<template>
    <div>
        <span>{{name}}</span>
        <Button @click="send">传给父组件/son3</Button>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Son1 extends Vue {

        name: string = "我是son1";

        send() {
            this.$Bus.$emit('son1', this.name);
        }

    }
</script>

<style lang="scss" scoped>

</style>

