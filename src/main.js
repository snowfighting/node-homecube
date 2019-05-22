import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './app';
import router from './router';

Vue.use(iView);

const vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
export default vm;