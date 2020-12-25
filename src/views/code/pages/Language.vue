<template>
    <div class="language">
        <Button @click="changeLang">切换</Button>
        <p>html:</p>
        <p>{{$t('你好!')}}</p>
        <p>{{$t('国际化')}}</p>

        <p>js:</p>
        <p>{{week}}</p>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Language extends Vue {

        get week () {
            return this.$i18n.t("星期一")
        }

        changeLang() {
            // 获取当前语言(默认中文)
            let lang = localStorage.getItem('lang') || 'cn';
            if(lang === 'cn') {
                lang = 'en';
            } else {
                lang = 'cn';
            }

            //切换语言
            this.$i18n.locale = lang;  // 通过切换locale的值来实现语言切换
            localStorage.setItem('lang', lang); //更改缓存中的语言

        }

    }
</script>

<style lang="scss" scoped>
    .language {
        padding: 10px 20px;
    }
</style>
