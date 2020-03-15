import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import Vue from "vue";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import store from "@/store/store";

import FloorManagement from "@/components/management/FloorManagement";

Vue.component("floor-management", FloorManagement);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
