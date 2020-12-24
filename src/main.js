import Vue from "vue";
import App from "./App.vue";
import store from "./store/fiat.js";
import crypto from "./store/crypto.js";

Vue.config.productionTip = false;

new Vue({
  store,
  crypto,
  render: (h) => h(App),
}).$mount("#app");
