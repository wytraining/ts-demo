import Vue from 'vue'
import VueI18n from 'vue-i18n';  //多语言

Vue.use(VueI18n);

export default new VueI18n({
    // 通过切换locale的值来实现语言切换
    locale: localStorage.getItem('lang') || 'cn',
    messages: {
        'cn': require('./cn'),
        'en': require('./en')
    }
});

// const i18n = new VueI18n({
//     locale: localStorage.getItem('lang') || 'cn',
//     messages: {
//         'cn': require('./cn'),
//         'en': require('./en')
//     }
// });
//
// export default i18n;