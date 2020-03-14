import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/exporter";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: modules
});

export default store;
