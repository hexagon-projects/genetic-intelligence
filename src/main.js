import { createApp } from 'vue'
import App from './App.vue'
import jQuery from 'jquery'

import './style.css'
import router from './router/router'
import { store } from './vuex/store'
import Select2 from 'vue3-select2-component'
// window.$ = window.jQuery = jQuery
const $ = jQuery;
window.$ = $; 
const app = createApp(App)
app.use(Select2)
app.use(router)
app.use(store)
app.mount('#app')
