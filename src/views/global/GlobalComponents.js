import Timeline from './timeline.vue'
import PhoneCall from './phonecall.vue'
import ImageLibrary from './imagelibrary.vue'



/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('c-timeline', Timeline)
    Vue.component('c-phone', PhoneCall)
    Vue.component('c-library', ImageLibrary)
    
  }
}

export default GlobalComponents
