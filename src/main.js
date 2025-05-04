// src/main.js ou src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/main.css';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'



loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
