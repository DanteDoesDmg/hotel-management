import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import store from '@/store/store'


import RoomReservation from '@/components/reservations/RoomReservation'

Vue.component('room-reservation', RoomReservation)
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
