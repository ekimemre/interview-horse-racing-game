import './assets/scss/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import BaseHeader from './components/Base/Header.vue'
import BaseButton from './components/Base/Button.vue'
import BaseTable from './components/Base/Table.vue'
import BaseTabToggle from './components/Base/TabToggle.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseHeader', BaseHeader)
app.component('BaseButton', BaseButton)
app.component('BaseTable', BaseTable)
app.component('BaseTabToggle', BaseTabToggle)

app.mount('#app')
