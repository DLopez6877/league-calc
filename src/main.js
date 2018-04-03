// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import _ from 'underscore';
import moment from 'moment';

import App from './App';
import Calculator from './Calc';
import NavComponent from './Nav';
import Matches from './Matches';
import News from './News';

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.prototype.$_ = _;
Vue.prototype.$moment = moment;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  components: { 
    App,
    Calculator,
    NavComponent
  },
  template: '<App/>'
})
