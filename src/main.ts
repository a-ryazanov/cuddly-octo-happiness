import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import 'bootstrap/dist/css/bootstrap.min.css';

import './plugins/vee-validate';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
