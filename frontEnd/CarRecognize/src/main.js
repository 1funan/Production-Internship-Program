import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import { router } from './common/router'
import naive from 'naive-ui'
import { createDiscreteApi } from "naive-ui"
const { message, notification, dialog } = createDiscreteApi(['message', 'notification', 'dialog'])

const app = createApp(App)
axios.defaults.baseURL = "http://localhost:8081"
app.provide("axios", axios)
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.use(naive)
app.use(createPinia())
app.use(router)
app.mount('#app')
