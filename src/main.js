   /*!

=========================================================
* Vue Design System - v1.1.0
=========================================================


* Copyright 2023 GEDE Juniada
* Licensed under MIT ()

* Coded by @djna911

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'

const vuetify = createVuetify({
    components,
    directives,
  })
const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
