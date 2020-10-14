import Vue from 'vue'
import App from './App.vue'
// import styles (would be cleaner to do this through a top-level main.css)
import 'vue-material/dist/vue-material.min.css'
import 'jquery-ui-dist/jquery-ui.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
