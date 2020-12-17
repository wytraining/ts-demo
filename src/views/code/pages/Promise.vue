<template>
    <div>
        <p>Promise的用法</p>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class PromiseDemo extends Vue {

        mounted() {
            // this.testPromise();

            this.testPromiseAll();
        }


        testPromise() {
            let p = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("执行！");
                    resolve("111")
                })
            });

            //@ts-ignore
            p.then((resolve, reject) => {
                console.log(resolve);
                // console.log(noData);  进入catch中
                let data2 = "222";
                return data2
            }).then(data2 => {
                console.log(data2);
                let data3 = "333";
                return data3
            }).then(data3 => {
                console.log(data3);
            }).catch(err => {
                console.log(err);
            })
            // return p;
        }


        testPromiseAll() {
            let p1 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("执行1！");
                    resolve("111")
                })
            });
            let p2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("执行2！");
                    resolve("222")
                })
            });


            //全部执行成功
            let p3 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("执行3！");
                    resolve("333");
                    // reject("333")
                })
            });
            Promise.all([p1, p2, p3]).then(res => {
                console.log(res); //["111", "222", "333"]
            });


            // //p3失败
            // let p3 = new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         console.log("执行3！");
            //         // resolve("333");
            //         reject("333")
            //     })
            // });
            // Promise.all([p1, p2, p3]).then(res => {
            //     console.log(res);
            // }, err => {
            //     console.log(err); //333
            // });

        }


    }
</script>

<style lang="scss" scoped>

</style>
