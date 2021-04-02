<template>

</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {dog, cat, fish} from "./Animal";
    import {Animal, Fish} from "./Animal";

    @Component({
        components: {}
    })
    export default class Template extends Vue {

        created() {

            console.log(dog.getInfo('dog1', 54));
            console.log(cat.getInfo('cat1', 65));
            console.log(fish.getInfo('fish1', 96));

            // 创建实例
            const dog2 = new Animal('dog_2',12);
            const cat2 = new Animal('cat_2',15);
            const fish2 = new Fish('fish_2', 26, 'yellow');
            console.log(fish2.getInfo('fish2', 32));

            dog.getColor('red');

        }

    }
</script>

<style lang="scss" scoped>

</style>

