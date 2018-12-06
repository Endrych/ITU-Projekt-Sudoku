import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import DifficultEnum from '../main/enums/DifficultEnum';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.filter('toTimerFormat', function(value) {
    if (typeof value !== 'number') {
        return value;
    }
    if (value < 10) {
        return '0' + value;
    }
    return value.toString();
});

Vue.filter('difficultToCzech', function(value) {
   return DifficultEnum[value];
});

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');
