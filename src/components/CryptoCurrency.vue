<template>
<div>
  <select v-for="(price) in price" v-bind:key="price">
    <option>{{ symbol }}</option>
    <option>{{ symbol }}</option>
  </select>
</div>
</template>




<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);


export default {
  name: "CryptoCurrency",
  data () {
    return {
      symbol: "test",
      price: "yo"
    }
  },
  mounted () {
    Vue.axios.get("https://api.binance.com/api/v3/ticker/price")
    .then((response) => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response)
    })
  }
}

</script>
