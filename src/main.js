// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/vi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import filter from './shared/filter'
import GlobalComponents from './views/global/GlobalComponents.js'
import 'element-ui/lib/theme-chalk/index.css'
import Lightbox from 'vue-easy-lightbox'
import VueHtml2Canvas from 'vue-html2canvas'
import 'babel-polyfill'

Vue.use(Lightbox)
Vue.use(VueHtml2Canvas)

// todo
// cssVars()
library.add(
  fas
)
Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(GlobalComponents)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  filter,
  template: '<App/>',
  components: {
    App
  }
})
