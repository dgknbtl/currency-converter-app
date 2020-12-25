import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const currencies = new Vuex.Store({
  state: {
    apiBase: "https://api.exchangeratesapi.io",
    currencyUnits: [],
    currencyFrom: null,
    currencyTo: null,
    amount: null,
    toAmount: null,
    convertValue: null,
    currencyChartData: {},
  },
  getters: {
    getCurrencyUnits(state) {
      return state.currencyUnits;
    },
    getConvertData(state) {
      const {
        amount,
        toAmount,
        convertValue,
        currencyFrom,
        currencyTo,
      } = state;

      return {
        amount,
        toAmount,
        convertValue,
        currencyFrom,
        currencyTo,
      };
    },
    getCurrencyChartData(state) {
      return state.currencyChartData;
    },
  },
  mutations: {
    ["SET_CURRENCY_UNITS"](state, value) {
      state.currencyUnits = value;
    },
    ["SET_CONVERT_CURRENCY"](
      state,
      { currencyFrom, currencyTo, amount, toAmount, convertValue, date }
    ) {
      state.currencyFrom = currencyFrom;
      state.currencyTo = currencyTo;
      state.amount = amount;
      state.toAmount = toAmount;
      state.convertValue = convertValue;
      state.date = date;
    },
    ["SET_CURRENCY_CHART"](state, value) {
      state.currencyChartData = value;
    },
  },
  actions: {
    async fetchCurrencyUnits({ commit, state }) {
      try {
        const response = await axios.get(`${state.apiBase}/latest`);
        const data = response.data.rates;
        let currencyUnits = [response.data.base];
        for (let key in data) {
          currencyUnits.push(key);
        }
        commit("SET_CURRENCY_UNITS", currencyUnits);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchConvertCurrency(
      { commit, state, dispatch },
      { currencyFrom, currencyTo, amount }
    ) {
      try {
        const response = await axios.get(
          `${state.apiBase}/latest?base=${currencyFrom}`
        );
        const date = response.data.date;
        const toAmount = response.data.rates[currencyTo];
        const convertValue = amount * toAmount;

        commit("SET_CONVERT_CURRENCY", {
          currencyFrom,
          currencyTo,
          amount,
          toAmount,
          convertValue,
          date,
        });

        dispatch("fetchCurrencyChart", {
          currencyFrom,
          currencyTo,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCurrencyChart({ commit, state }, { currencyFrom, currencyTo }) {
      try {
        let pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 7);
        let date = new Date();

        const oneWeekAgo = `${pastDate.getFullYear()}-${pastDate.getMonth() +
          1}-${pastDate.getDate() - 2}`;

        const currentDate = `${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`;

        const response = await axios.get(
          `${state.apiBase}/history?start_at=${oneWeekAgo}&end_at=${currentDate}&base=${currencyFrom}`
        );
        const data = response.data.rates;

        let chartData = [];

        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        for (let key in data) {
          let d = new Date(key);
          let newDate = `${d.getDate()} ${monthNames[d.getMonth()]}`;

          [data[key]].map((item) => {
            chartData.push({
              date: newDate,
              value: item[currencyTo].toFixed(5),
            });
          });
        }
        const sortedChartData = chartData.sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        });

        commit("SET_CURRENCY_CHART", sortedChartData);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default currencies;