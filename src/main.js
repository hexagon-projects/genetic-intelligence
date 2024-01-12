import { createApp } from 'vue'
import App from './App.vue'
import jQuery from 'jquery'

import './style.css'
import router from './router/router'
import { store } from './vuex/store'
window.$ = window.jQuery = jQuery
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
