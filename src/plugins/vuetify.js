/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import LuxonAdapter from "@date-io/luxon"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  date: {
    adapter: new LuxonAdapter({ locale: "zhHans" }),
  },
  theme: {
    defaultTheme: 'dark'
  }
})
