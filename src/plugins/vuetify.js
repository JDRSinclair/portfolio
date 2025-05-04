// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Importez les styles globaux
// import '@/assets/styles/main.css';
import '@mdi/font/css/materialdesignicons.css'


export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})
